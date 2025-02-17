import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import supabase from "../supabase/client";
import realtimeChat from "../css/realtimeChat.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default function RealtimeChat({ game }) {
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const messageRef = useRef(null);
  dayjs.extend(relativeTime);

  function scrollSmoothToBottom() {
    const scrollContainer = messageRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }

  const getInitialMessages = async () => {
    setLoadingInitial(true);
    if (messages.length) return;

    const { data, error } = await supabase
      .from("Messages")
      .select()
      .eq("game_id", game.id);

    if (error) {
      setError(error.message);
      setLoadingInitial(false);
      return;
    }

    setLoadingInitial(false);
    setMessages(data);
  };

  useEffect(() => {
    getInitialMessages();

    const channel = supabase
      .channel("Messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Messages",
        },
        () => getInitialMessages()
      )
      .subscribe();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    scrollSmoothToBottom();
  }, [messages]);

  if (loadingInitial) {
    return <progress />;
  }

  return (
    <div
      className={realtimeChat.message}
      ref={messageRef}
      style={{ maxHeight: "600px", overflowY: "auto" }}
    >
      {error && <article>{error}</article>}
      {messages &&
        messages.map((message) => (
          <article key={message.id} className={realtimeChat.detailArticle}>
            <p style={{ color: "black", fontWeight: "bold" }}>
              {message.profile_username}
            </p>
            <p style={{ color: "black" }}>{message.content}</p>

            <div style={{ textAlign: "end" }}>
              <small>{dayjs().to(dayjs(message.created_at))}</small>
            </div>
          </article>
        ))}
    </div>
  );
}

RealtimeChat.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  session: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
