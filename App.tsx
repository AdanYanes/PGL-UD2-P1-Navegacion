import { StyleSheet, Text, View } from 'react-native';
import Welcome from './components/Welcome';
import { useState } from 'react';
import Login from './components/Login';

export default function App() {
  const [isLoging, setIsLoging] = useState(false);
  const [isLoged, setIsLoged] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.appContainer}>
      {isLoging ? <Login setIsLoged={setIsLoged}/> : <Welcome setIsLoging={setIsLoging}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
