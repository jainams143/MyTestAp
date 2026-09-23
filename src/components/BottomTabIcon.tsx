import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type TabName = 'Home' | 'Listing' | 'Settings';

const symbols: Record<TabName, string> = {
  Home: '\u2302',
  Listing: '\u2637',
  Settings: '\u2699',
};

export function BottomTabIcon({
  name,
  color,
}: {
  name: TabName;
  color: string;
}) {
  return (
    <View style={styles.container}>
      <Text accessibilityLabel={`${name} tab`} style={[styles.icon, { color }]}>
        {symbols[name]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 27, justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 24, lineHeight: 27, fontWeight: '600' },
});
