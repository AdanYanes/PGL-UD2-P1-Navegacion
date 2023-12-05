import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Card from "./Card";
import {cardsData} from "../data/MyInfo"
import {CardData} from "../data/CardTypes";



const CardList = () => {
  return (
    <View style={{backgroundColor: "#D9D9D9"}}>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      {cardsData.map((card: CardData, index: number) =>
        <Card text={card.text} key={index}></Card>
      )}
    </ScrollView>
    </View>
  );
};

export default CardList;
