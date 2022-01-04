import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      rocket {
        rocket_id
        rocket_name
      }
    }
  }
`;

function Launches() {
  const { loading, data, error } = useQuery(LAUNCHES_QUERY);
  console.log(`data`, data);
  return (
    <div>
      <h1 className="display-4 my-3">Launches</h1>
      {loading && <>loading...</>}
      {data && data.launches.map((launch) => <div>{launch.mission_name}</div>)}
    </div>
  );
}
export default Launches;
