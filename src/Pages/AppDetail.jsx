/* eslint-disable react-hooks/exhaustive-deps */
import { useLoaderData } from "react-router";
import { useState, useEffect, useContext } from "react";
import GameImage from "../Components/GameUI/components/GameImage";
import SessionContext from "../context/SessionContext";
import supabase from "../DataBase/client";
import { Toaster, toast } from "sonner";
import RealtimeChat from "../RealtimeChatUI";

export default function AppDetail() {
  const session = useContext(SessionContext);
  const game = useLoaderData();
  const [fav, setFav] = useState([]);

  async function readFavGame() {
    const { user } = session;
    let { data: favourites, error } = await supabase
      .from("favourites")
      .select(`*`)
      .eq("profile_id", user.id)
      .eq("game_id", game.id);

    if (error) {
      console.log(error);
    }
    setFav(favourites);
  }

  async function insertFavGame(game) {
    const { error } = await supabase
      .from("favourites")
      .insert([
        { profile_id: session.user.id, game_id: game.id, game_name: game.name },
      ])
      .select();
    if (error) {
      toast.error("Insert failed");
    } else {
      toast.success("Insert Success");
      readFavGame();
    }
  }

  async function removeFavGame(game) {
    const { user } = session;
    const { error } = await supabase
      .from("favourites")
      .delete()
      .eq("game_id", game.id)
      .eq("profile_id", user.id);

    if (error) {
      toast.error("Game remove failed");
    } else {
      toast.success("Rimosso dai preferiti");
      readFavGame();
    }
  }

  async function handleMessageSubmit(event) {
    event.preventDefault();
    const inputMessage = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputMessage));
    if (typeof message === "string" && message.trim().length !== 0) {
      const { error } = await supabase
        .from("Messages")
        .insert([
          {
            profile_id: session.user.id,
            game_id: game.id,
            content: message,
            profile_username: session.user.user_metadata.username,
          },
        ])
        .select();

      if (error) {
        toast.error("Message failed");
      } else {
        toast.success("Message sent");
        inputMessage.reset();
      }
    }
  }

  useEffect(() => {
    readFavGame();
  }, []);

  return (
    <div className="game_detail_wrapper">
      <div className="game_info">
        <h1 style={{ textAlign: "center" }}>{game.name}</h1>

        <div className="imageContainer">
          <div style={{ width: "50%" }}>
            <GameImage image={game.background_image} className="imageStyle" />
          </div>
          <div style={{ width: "50%" }}>
            <GameImage
              image={game.background_image_additional}
              className="imageStyle"
            />
          </div>
        </div>

        <div>
          {session && (
            <div style={{ paddingRight: "10px" }}>
              {fav.length === 0 ? (
                <button
                  onClick={() => insertFavGame(game)}
                  className="fullWidthBtn"
                >
                  Aggiungi ai preferiti
                </button>
              ) : (
                <button
                  onClick={() => removeFavGame(game)}
                  className="fullWidthBtn"
                >
                  Rimuovi dai preferiti
                </button>
              )}
            </div>
          )}
          <Toaster richColors />
          <div style={{ display: "flex" }}>
            <h4 style={{ textAlign: "start", paddingRight: "10px" }}>
              Game ranking
            </h4>
            <h4 style={{ textAlign: "start" }}>{game.rating}/5</h4>
          </div>
        </div>
        <h3>About</h3>
        <small>{game.description_raw}</small>
      </div>
      <div className="game_media">
        {session ? (
          <div style={{ paddingTop: "10%" }}>
            <h5 style={{ color: "white" }}>Chat live with gamers</h5>

            <div>
              {session && <RealtimeChat game={game} session={session} />}
            </div>
            <div>
              <form onSubmit={handleMessageSubmit}>
                <fieldset role="group" className="">
                  <input
                    className="inputDetail fieldset"
                    type="text"
                    name="message"
                    placeholder="Chat..."
                  />
                  <input
                    className="buttonDetail fieldset"
                    type="submit"
                    value="Send"
                  />
                </fieldset>
              </form>
              <Toaster richColors />
            </div>
          </div>
        ) : (
          <h2> Sign up or log in to chat with other online users </h2>
        )}
      </div>
    </div>
  );
}
