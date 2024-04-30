import cardData from "@pages/sidepanel/models/cards.json";
import { Card ,CardJson as CardInterface} from "@pages/sidepanel/types";
import CardComponent from "@pages/sidepanel/components/cards/Card";
import "@pages/sidepanel/components/cards/CardContainer/index.scss";
// Assert that cardData is an array of CardInterface
const typedCardData: CardInterface[] = cardData as CardInterface[];

const CardContainer: React.FC = () => {
    // Logic to render cards using the imported JSON array
    return (
        <div className="cards-container">
        {typedCardData.map((card: CardInterface) => ( // Type is inferred from cardDefinitions array
          <CardComponent
          key={card.id} // Assuming 'id' is a unique identifier
          icon = {card.icon}
          name={card.name}
          description={card.description}
          inputFields={card.inputFields}
          tags={card.tags}
          category={card.category}
        />
        ))}
      </div>
    );
  };

  export default CardContainer;
