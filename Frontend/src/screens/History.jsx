import { useEffect, useState } from "react";
import fondo from "../assets/Fondo.png";
import { GroupsList } from "../components/GroupsList";
import line from "../assets/line.png";
import { Movie } from "../components/Movie";

export const History = () => {
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("http://localhost:5000/historial");
        const data = await response.json();
        console.log(data);
        setGroups(data.historico_recomendaciones);
        console.log(data.historico_recomendaciones);
      } catch (error) {
        console.error("Error al obtener grupos:", error);
      }
    };
    fetchGroups();
  }, []);

  console.log("soy el console log :)", groups);

  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center text-white">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${fondo})` }}
      ></div>

      {groups.length != [] ? (
        <section className="flex flex-row relative w-full px-24 z-10 items-center justify-center h-fit">
          <GroupsList
            groups={groups}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />

          <img className="flex mx-10 h-[600px] " src={line} />

          <main className="flex w-3/4 h-full flex-col px-2 justify-start ">
            <h2 className="text-2xl font-medium">
              Recommendations for{" "}
              <span className="text-primary-lightpink">
                {groups[selectedGroup].group_name}{" "}
              </span>
            </h2>

            <section className="flex flex-wrap mt-20 h-fit mb-6 space-x-12">
              <div className="flex w-full space-x-6 items-center justify-center">
                {groups[selectedGroup].recomendaciones.map((rec, index) => (
                  <Movie
                    key={index}
                    title={rec.title}
                    releaseYear={rec.releaseYear}
                    rating={rec.imdbAverageRating}
                    genres={rec.genres}
                    type={rec.type}
                    platform={rec.platform}
                    size={"small"}
                  />
                ))}
              </div>
            </section>
          </main>
        </section>
      ) : (
        <h1>Loading groups...</h1>
      )}
    </div>
  );
};
