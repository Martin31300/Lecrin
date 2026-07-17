import { useEffect, useState } from "react";
import type { Movement } from "../types/vite-env";
import { API_URL } from "../utils/api";
import MouvementCard from "./MouvementCard";
import Searchbar from "./Searchbar/Searchbar";

function MouvementList() {
  const [dataMovements, setDataMovements] = useState<Movement[]>([]);
  const [search, setSearch] = useState("");

  const filteredMouvement = dataMovements.filter((movement) =>
    movement.name?.toLowerCase().includes(search?.toLowerCase()),
  );

  useEffect(() => {
    fetch(`${API_URL}/api/movements`)
      .then((res) => res.json())
      .then((data) => {
        setDataMovements(data);
      });
  }, []);

  return (
    <div className="pageMvt">
      <Searchbar search={search} setSearch={setSearch} />
      {filteredMouvement.map((movement) => {
        return <MouvementCard key={movement.id} movement={movement} />;
      })}
    </div>
  );
}

export default MouvementList;
