import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const complaints = [
  { date: "02 APR 2025 - 02:00 PM", code: "N/A", venue: "IT lab-1", details: "Using mobile phone inside the lab", timer: "00:00:00" },
  { date: "30 MAR 2025 - 11:00 AM", code: "N/A", venue: "CT lab", details: "Not wearing ID card during PS assessment", timer: "00:00:00" },
  { date: "21 MAR 2025 - 10:00 AM", code: "N/A", venue: "Cyber security lab", details: "Dress code not followed", timer: "04:22:18" },
  { date: "07 APR 2025 - 03:00 PM", code: "N/A", venue: "AI&DS lab-3", details: "No proper haircut", timer: "03:40:58" },
  { date: "21 MAY 2025 - 10:15 AM", code: "117", venue: "CSE lab-II", details: "Critical check!", timer: "00:00:00" },
  { date: "19 MAY 2025 - 07:57 PM", code: "112", venue: "EW 101", details: "Coming late after the break", timer: "00:00:00" }
];

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>DC Portal</Text>
      <Text style={styles.subHeading}>Hello Rahul ✨</Text>

      <View style={styles.cardList}>
        {complaints.map((c, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.date}>{c.date}</Text>

            <Text>
              <Text style={styles.label}>Complaint Code: </Text>
              <Text style={c.code === "N/A" ? styles.redText : styles.blackText}>
                {c.code}
              </Text>
            </Text>

            <Text>
              <Text style={styles.label}>Venue: </Text>
              {c.venue}
            </Text>

            <Text>
              <Text style={styles.label}>Complaint Details: </Text>
              {c.details}
            </Text>

            <Text>
              <Text style={styles.label}>Timer: </Text>
              <Text style={styles.redText}>{c.timer}</Text>
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.acceptBtn}>
                <Text style={styles.btnText}>ACCEPT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.revokeBtn}>
                <Text style={styles.btnText}>REVOKE</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f8f8f8" },
  heading: { fontSize: 22, fontWeight: "bold", color: "#1f2937" },
  subHeading: { fontSize: 18, marginVertical: 8, color: "#374151" },
  cardList: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: {
    width: 280,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  date: { fontWeight: "600", color: "#6b7280", marginBottom: 4 },
  label: { fontWeight: "600" },
  redText: { color: "#dc2626" },
  blackText: { color: "#000" },
  buttonRow: { flexDirection: "row", gap: 8, marginTop: 12 },
  acceptBtn: { backgroundColor: "#16a34a", padding: 8, borderRadius: 6 },
  revokeBtn: { backgroundColor: "#dc2626", padding: 8, borderRadius: 6 },
  btnText: { color: "white", fontWeight: "bold" }
});
