import { useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_PLANT } from "../utils/queries";
import { useEffect, useState } from "react";

export default function PlantDetails() {
  const { plantId } = useParams();
  const [singlePlantData, setSinglePlantData] = useState(null);
  /* FOR JOHN AND MANNINDER REMOVE BEFORE DEPLOYMENT */
  const [useMockData] = useState(true); // if you want to use mockdata use true, if you want to use userdata use false
  const [getPlantData, { error, loading, data }] = useLazyQuery(QUERY_PLANT);
  const fakePlantData = {
    _id: "1",
    latinName: "planty-mcPlantius",
    commonName: "Planty Mc Plant Face",
    img: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/5/55/Swoll_Groot_Infobox.jpg/revision/latest/scale-to-width-down/1200?cb=20230420151132",
    idealLight: "Yes",
    watering: "Please",
    username: "IamGroot",
    notification: false,
    plantNotes: [
      {
        _id: "",
        note: "",
        username: "",
        createdAt: "",
      },
    ],
  };
  /* FOR KATE: Performance - Remove before deployment and conditionally render based on useQuery hook*/
  useEffect(() => {
    getPlantData({ variables: { plantId: plantId } });
    if (data) {
      setSinglePlantData(data);
    }
  }, [data, getPlantData, plantId]);
  if (error) {
    console.warn(error);
  }
  console.log(singlePlantData);
  return (
    <div>
      {/* All Material UI stuff will go inside this div */}
      {useMockData && <div>{fakePlantData.commonName}</div>}
      {!useMockData && <div>{singlePlantData?.plant?.commonName}</div>}
    </div>
  );
}
