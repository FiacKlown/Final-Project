/* eslint-disable react-hooks/exhaustive-deps */
import { useLoaderData } from "react-router";
import { useState, useEffect, useContext } from "react";
import GameImage from "../components/gameUI/components/gameImage";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/client";
import { Toaster, toast } from "sonner";
import RealtimeChat from "../realtimeChatUI";
import detailStyle from "../css/detailStyle.module.css"

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
    <div className={detailStyle.gameDetailWrapper}>
      <div className={detailStyle.gameInfo}>
        <h1 style={{ textAlign: "center" }}>{game.name}</h1>

        <div className={detailStyle.imageContainer}>
            <GameImage image={game.background_image} className={detailStyle.imageStyle} />
        </div>

        <div>
          {session && (
            <div style={{ paddingRight: "10px", margin:"10px"}}>
              {fav.length === 0 ? (
                <button
                  onClick={() => insertFavGame(game)}
                  className={detailStyle.fullWidthBtn}
                >
                  Aggiungi ai preferiti
                </button>
              ) : (
                <button
                  onClick={() => removeFavGame(game)}
                  className={detailStyle.fullWidthBtn}
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
        <h3 style={{ textAlign: "center" }}>About</h3>
        <div style={{ textAlign: "center" }}>
          <small>{game.description_raw}</small>
        </div>
        

        <div>
            <GameImage
              image={game.background_image_additional}
              className={detailStyle.imageStyle}
            />
          </div>
      </div>
      <div className={detailStyle.gameMedia}>
        {session ? (
          <div style={{ paddingTop: "7%", position:"sticky", top:"0" }}>
            <h5 style={{ color: "white" }}>Chat live with gamers</h5>

            <div>
              {session && <RealtimeChat game={game} session={session} />}
            </div>
            <div>
              <form onSubmit={handleMessageSubmit}>
                <fieldset role="group">
                  <input
                    className={detailStyle.inputDetail}
                    type="text"
                    name="message"
                    placeholder="Chat..."
                  />
                  <input
                    className={detailStyle.buttonDetail}
                    type="submit"
                    value="Send"
                  />
                </fieldset>
              </form>
              <Toaster richColors />
            </div>
          </div>
        ) : (
          <div style={{position:"sticky", top:"0", paddingTop:"20px" , textAlign:"center"} }>
            <h2> Sign up or log in to chat with other online users </h2>
          </div>
          
        )}
      </div>
    </div>
  );
}
