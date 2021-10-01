import { useSelector } from "react-redux"

const Activities = () => {
  const card = useSelector(state => state.card)
  
  return (
    <ul>
      { card.activities.map((activity) => {
        return (
          <li key={activity}>
            {activity}
          </li>
        )
      })}
    </ul>
  )
}

export default Activities