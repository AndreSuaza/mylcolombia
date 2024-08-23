import { useEffect } from "react";


export const CarguePage = () => {
    

    const getFetch = async () => {

        const resp = await fetch( `https://api.myl.cl/cards/edition/espiritu_samurai`);
        const data = await resp.json();
        


        data.cards.forEach(card => {
          card.price = priceByRarity(card.rarity);
        });

        console.log(data);

    }


    const priceByRarity = (rarity) => {
      switch (rarity) {

//         result.updateMany({rarity: "0", ed_slug: exp }, { $set: { "price": "20.000 - 30.000"}}, {upsert: true}); //Promocional
// result.updateMany({rarity: "1", ed_slug: exp }, { $set: { "price": "60.000 - 80.000"}}, {upsert: true}); //Legendaria 
// result.updateMany({rarity: "2", ed_slug: exp }, { $set: { "price": "40.000 - 60.000"}}, {upsert: true}); //Ultra Real
// result.updateMany({rarity: "3", ed_slug: exp }, { $set: { "price": "15.000 - 30.000"}}, {upsert: true}); //Mega Real
// result.updateMany({rarity: "4", ed_slug: exp }, { $set: { "price": "2000 - 7000"}}, {upsert: true}); //Real
// result.updateMany({rarity: "5", ed_slug: exp }, { $set: { "price": "1000"}}, {upsert: true}); //Cortesano 
// result.updateMany({rarity: "6", ed_slug: exp }, { $set: { "price": "1000"}}, {upsert: true}); //Vasallo
// result.updateMany({rarity: "9", ed_slug: exp }, { $set: { "price": "80.000 - 100.000"}}, {upsert: true}); //Secreta
// result.updateMany({rarity: "7", ed_slug: exp }, { $set: { "price": "1000 - 5.000"}}, {upsert: true}); //Ficha
// result.updateMany({rarity: "11", ed_slug: exp }, { $set: { "price": "35.000"}}, {upsert: true}); //Set Paralelo

        case "0":
          return "25.000"

        case "1":
          return "80.000"

        case "2":
          return "60.000"

        case "3":
          return "30.000"
            
        case "4":
          return "5000"
        
        case "5":
          return "1000"

        case "6":
          return "1000"

        case "7":
          return ""

        case "9":
          return "200.000"

        case "11":
          return "35.000"

        default:
          return ""
      }

    }

    useEffect(() => {
        getFetch();
    }, [])

  return (
    <div>cargueexp</div>
  )
}
