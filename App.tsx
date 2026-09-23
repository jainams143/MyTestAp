import React, { useMemo, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { AppHeader } from './src/components/AppHeader';
import { BottomTabIcon } from './src/components/BottomTabIcon';
import { HomeScreen } from './src/screens/HomeScreen';
import { ListingScreen } from './src/screens/ListingScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { dark, light } from './src/theme';

const Tab = createBottomTabNavigator();

function AppContent() {
  const [isDark, setIsDark] = useState(false);
  const colors = isDark ? dark : light;
  const insets = useSafeAreaInsets();
  const navigationTheme = useMemo(
    () => ({
      ...(isDark ? DarkTheme : DefaultTheme),
      colors: {
        ...(isDark ? DarkTheme : DefaultTheme).colors,
        background: colors.background,
      },
    }),
    [isDark, colors.background],
  );
  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={[styles.app, { backgroundColor: colors.background }]}>
        <AppHeader
          colors={colors}
          isDark={isDark}
          topInset={insets.top}
          onToggle={() => setIsDark(value => !value)}
        />
        <View style={styles.navigator}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: colors.primary,
              tabBarInactiveTintColor: colors.muted,
              tabBarStyle: [
                styles.tabBar,
                {
                  backgroundColor: colors.card,
                  borderTopColor: colors.border,
                  paddingBottom: Math.max(insets.bottom, 8),
                },
              ],
              tabBarIcon: ({ color }) => (
                <BottomTabIcon
                  name={route.name as 'Home' | 'Listing' | 'Settings'}
                  color={color}
                />
              ),
              sceneStyle: { backgroundColor: colors.background },
            })}
          >
            <Tab.Screen name="Home">
              {() => <HomeScreen colors={colors} />}
            </Tab.Screen>
            <Tab.Screen name="Listing">
              {() => <ListingScreen colors={colors} />}
            </Tab.Screen>
            <Tab.Screen name="Settings">
              {() => <SettingsScreen colors={colors} />}
            </Tab.Screen>
          </Tab.Navigator>
        </View>
      </View>
    </NavigationContainer>
  );
}

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  app: { flex: 1 },
  navigator: { flex: 1 },
  tabBar: { minHeight: 62, paddingTop: 6 },
});
export default App;
