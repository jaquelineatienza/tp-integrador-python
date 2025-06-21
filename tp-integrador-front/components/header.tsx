import { View, Image, StyleSheet, Text } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require("@/assets/images/logo-banco.webp")}
        style={styles.logo}
      />
      <Text style={styles.text}>Banco de Datos Integrador</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
    marginTop: 6,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  header: {
    backgroundColor: "#052145",
    padding: 2,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text: {
    color: "white",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 18,
    marginLeft: 10,
  },
});
export default Header;
