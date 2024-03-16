import { gql, useSubscription } from "@apollo/client"
import dayjs from "dayjs"
import React from "react"

const SUBSCRIBE_TIME_UPDATE = gql`
  subscription OnTimeUpdated {
    timeUpdated
  }
`

export const GraphqlSubscription = () => {
  const { data, loading } = useSubscription(SUBSCRIBE_TIME_UPDATE)
  const formattedDate = data?.timeUpdated ? dayjs(data.timeUpdated).format("DD-MM-YYYY HH:mm:ss") : "Loading..."

  return <div>{loading ? <p>Subscribing to time updates...</p> : <h4>Current Server Time: {formattedDate}</h4>}</div>
}
