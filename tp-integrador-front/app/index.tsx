import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { prediction } from "@/Service/model.service";
import Header from "@/components/header";

export default function Formulario() {
  const router = useRouter();

  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [familyMembers, setFamilyMembers] = useState("");
  const [creditCardExpenses, setCreditCardExpenses] = useState("");
  const [educationLevel, setEducationLevel] = useState(1);
  const [mortgageAmount, setMortgageAmount] = useState("");
  const [income, setIncome] = useState("");

  const handleEnviar = () => {
    const features = {
      age: Number(age),
      experience: Number(experience),
      income: Number(income),
      family: Number(familyMembers),
      zip_Code: Number(postalCode),
      cCAvg: Number(creditCardExpenses),
      education: educationLevel,
      mortgage: Number(mortgageAmount),
    };

    prediction(features)
      .then((response) => {
        console.log("Respuesta predicción:", response);
        router.push({
          pathname: "/resultado",
          params: { resultado: JSON.stringify(response) },
        });
      })
      .catch((error) => {
        console.error("Error en la predicción:", error);
      });
  };

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.text}>Rellene el siguiente formulario</Text>

        <TextInput
          style={styles.input}
          placeholder="Edad"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
        <TextInput
          style={styles.input}
          placeholder="Años de experiencia"
          keyboardType="numeric"
          value={experience}
          onChangeText={setExperience}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingreso anual"
          keyboardType="numeric"
          value={income}
          onChangeText={setIncome}
        />
        <TextInput
          style={styles.input}
          placeholder="Código Postal"
          keyboardType="numeric"
          value={postalCode}
          onChangeText={setPostalCode}
        />
        <TextInput
          style={styles.input}
          placeholder="Miembros de la familia"
          keyboardType="numeric"
          value={familyMembers}
          onChangeText={setFamilyMembers}
        />
        <TextInput
          style={styles.input}
          placeholder="Gastos tarjeta de crédito"
          keyboardType="numeric"
          value={creditCardExpenses}
          onChangeText={setCreditCardExpenses}
        />
        <TextInput
          style={styles.input}
          placeholder="Monto de hipoteca"
          keyboardType="numeric"
          value={mortgageAmount}
          onChangeText={setMortgageAmount}
        />
        <Text>Nivel educativo:</Text>

        <TextInput
          style={styles.input}
          placeholder="1: Secundario, 2: Universitario, 3: Postgrado"
          keyboardType="numeric"
          value={educationLevel.toString()}
          onChangeText={(v) => setEducationLevel(Number(v))}
        />

        <Button title="Enviar formulario" onPress={handleEnviar} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,

    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  container: {
    margin: 20,
    padding: 50,
    paddingLeft: 200,
    paddingRight: 200,
    backgroundColor: "#f9f9f9",
  },
  text: {
    color: "black",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 18,
  },
});
