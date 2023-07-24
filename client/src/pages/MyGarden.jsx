import { useCallback, useEffect, useState } from "react";
import useAuthService from "../utils/authHook";
import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_PLANTS, QUERY_USER } from "../utils/queries";

export default function MyGarden() {
  /* FOR JOHN AND MANNINDER REMOVE BEFORE DEPLOYMENT */
  const [useMockData] = useState(false); // if you want to use mockdata use true, if you want to use userdata use false
  const Auth = useAuthService();
  const token = Auth.getToken();
  const user = Auth.getProfile(token);
  const username = user.data.username;
  console.log(user);
  const [plantData, setPlantData] = useState(null);
  const [getPlantData, { error, loading, data }] = useLazyQuery(QUERY_USER);

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

  return (
    <div>
      {useMockData &&
        mockPlantData.map((item) => {
          return (
            <div>
              <img src={item.img} />
            </div>
          );
        })}
      {!useMockData &&
        plantData?.map((plant) => {
          return (
            <div>
              <img src={plant.img} />
            </div>
          );
        })}
    </div>
  );
}
