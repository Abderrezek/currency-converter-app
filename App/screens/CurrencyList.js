import React from "react";
import { StatusBar, FlatList, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

import currencies from "../constants/currencyList.json";
import { RowItem, RowSeparator } from "../components/RowItem";
import colors from "../constants/colors";

export default ({ navigation, route = {} }) => {
  const insets = useSafeAreaInsets();

  const params = route.params || {};
  const { activeCurrency, onChange = () => {} } = params;

  return (
    <View style={styles.modal}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <FlatList
        data={currencies}
        renderItem={({ item }) => {
          const selected = activeCurrency === item;

          return (
            <RowItem
              title={item}
              onPress={() => {
                onChange(item);
                navigation.pop();
              }}
              rightIcon={
                selected && (
                  <View style={styles.icon}>
                    <Entypo name="check" size={20} color={colors.white} />
                  </View>
                )
              }
            />
          );
        }}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <RowSeparator />}
        ListFooterComponent={() => (
          <View style={{ paddingBottom: insets.bottom }} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modal: { flex: 1, backgroundColor: colors.white },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
  },
});