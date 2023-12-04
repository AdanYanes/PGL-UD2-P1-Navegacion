import { StyleSheet, Text, View } from 'react-native';
import Welcome from './components/Welcome';

export default function App() {

  return (
    <View style={styles.appContainer}>
      <Welcome></Welcome>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
