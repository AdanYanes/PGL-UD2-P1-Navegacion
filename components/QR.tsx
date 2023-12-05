import React from "react";
import {StyleSheet, View } from 'react-native';
import QRCode from "react-native-qrcode-svg";
import { ProfileData } from "../data/CardTypes";
import { profileData } from "../data/MyInfo";

interface QRProps {
  QRRoute: string
}

const QR = () => {
  return (
      <View style={styles.CenterQR}>
        <QRCode value={profileData.QRRoute}/>
      </View>
  );
};

const styles = StyleSheet.create({
    CenterQR: {
      flex: 1,
      alignItems: "center",
      justifyContent: 'center',
      backgroundColor: "#d9d9d9"
    },
  });
export default QR;
