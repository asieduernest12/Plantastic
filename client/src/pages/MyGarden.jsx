import { useEffect, useState } from "react";
import useAuthService from "../utils/authHook";
import { useLazyQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { useNavigate } from "react-router-dom";

export default function MyGarden() {
  /* FOR JOHN AND MANNINDER REMOVE BEFORE DEPLOYMENT */
  const [useMockData] = useState(true); // if you want to use mockdata use true, if you want to use userdata use false
  const Auth = useAuthService();
  const token = Auth.getToken();
  const user = Auth.getProfile(token);
  const username = user.data.username;
  const navigate = useNavigate();
  const [plantData, setPlantData] = useState(null);
  const [getPlantData, { error, loading, data }] = useLazyQuery(QUERY_USER);

  /* FOR KATE: Performance - Remove before deployment and conditionally render based on useQuery hook*/
  /* This watches for changes in data, and user.data._id and sets setPlantData state */
  useEffect(() => {
    getPlantData({ variables: { userId: user.data._id } });
    if (data) {
      setPlantData(data.user.plants);
    }
  }, [data, getPlantData, user.data._id]);

  const mockUser = {
    username: "IamGroot",
  };
  const mockPlantData = [
    {
      id: "1",
      img: "https://m.media-amazon.com/images/I/816bMUrw6DL._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: "2",
      img: "https://m.media-amazon.com/images/I/816bMUrw6DL._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: "3",
      img: "https://m.media-amazon.com/images/I/816bMUrw6DL._AC_UF894,1000_QL80_.jpg",
    },
  ];

  function handleClick(id) {
    navigate(`/plantdetails/${id}`);
  }

  return (
    <div>
      {useMockData &&
        mockPlantData.map((item) => {
          return (
            <div>
              {/* All Material UI stuff will go inside this div */}
              <img
                src={item.img}
                alt=""
                onClick={() => {
                  handleClick(item.id);
                }}
              />
            </div>
          );
        })}
      {!useMockData &&
        plantData?.map((plant) => {
          console.log(plant);
          return (
            <div>
              {/* All Material UI stuff will go inside this div */}
              <img
                src={plant.img}
                alt=""
                onClick={() => {
                  handleClick(plant._id);
                }}
              />
            </div>
          );
        })}
    </div>
  );
}
