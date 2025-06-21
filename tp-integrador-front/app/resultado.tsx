import React from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "@/components/header";

type Metric = {
  precision: number;
  recall: number;
  "f1-score": number;
  support: number;
};

export default function Resultado() {
  const params = useLocalSearchParams();
  const rawResultado = params.resultado;

  let resultado: any;
  try {
    if (!rawResultado || rawResultado === "undefined") {
      throw new Error("Resultado no definido");
    }
    resultado = JSON.parse(rawResultado as string);
  } catch (e) {
    console.error("Error parseando params.resultado:", e);
    resultado = null;
  }

  if (!resultado) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se pudo cargar el resultado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <Text style={styles.titulo}>Resultado del modelo</Text>
      <Text style={styles.resultado}>
        ¿Solicita préstamo?: {resultado.prediction === 1 ? "Sí" : "No"}
      </Text>
      <Text style={styles.resultado}>
        Accuracy del modelo: {resultado.accuracy?.toFixed(2) ?? "N/A"}
      </Text>

      {resultado.report && (
        <View style={styles.reportContainer}>
          <Text style={styles.subtitulo}>Reporte detallado:</Text>
          {Object.entries(resultado.report).map(([label, metrics]) =>
            metrics && typeof metrics === "object" ? (
              <View key={label} style={styles.metricBox}>
                <Text style={styles.metricLabel}>{label}</Text>
                <Text>Precision: {(metrics as Metric).precision}</Text>
                <Text>Recall: {(metrics as Metric).recall}</Text>
                <Text>F1-Score: {(metrics as Metric)["f1-score"]}</Text>
                <Text>Support: {(metrics as Metric).support}</Text>
              </View>
            ) : null
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  resultado: {
    fontSize: 16,
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  reportContainer: {
    marginTop: 10,
  },
  metricBox: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  metricLabel: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
