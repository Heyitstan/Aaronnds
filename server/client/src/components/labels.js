import { useSelector } from "react-redux";

const Labels = () => {
    const card = useSelector(state => state.card)

  return (
    <div>
      {card.labels.map((label) => {
            switch (label) {
              case "yellow":
                return (
                  <div className="label yellow" key={label}></div>
                )
              case "blue":
                return (
                  <div className="label blue" key={label}></div>
                )
              case "black":
                return (
                  <div className="label black" key={label}></div>
                )
              case "green":
                return (
                  <div className="label green" key={label}></div>
                )
              case "red":
                return (
                  <div className="label red" key={label}></div>
                )
              case "purple":
                return (
                  <div className="label purple" key={label}></div>
                )
              default:
                return null
            }
          })}
    </div>
  )
    
};

export default Labels;