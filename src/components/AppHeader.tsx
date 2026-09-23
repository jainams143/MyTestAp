import React, { useState } from 'react';
import {
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import type { Palette } from '../theme';

const resumeLinks = [
  {
    label: 'Email',
    value: 'jainamshah7955@gmail.com',
    url: 'mailto:jainamshah7955@gmail.com',
  },
  {
    label: 'Phone',
    value: '+91 91062 78078',
    url: 'tel:+919106278078',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/jainam-shah-0899751a0',
    url: 'https://linkedin.com/in/jainam-shah-0899751a0',
  },
  {
    label: 'GitHub',
    value: 'github.com/jainams143',
    url: 'https://github.com/jainams143',
  },
];

const resumeContent = `Jainam Shah
Ahmedabad, India

PROFESSIONAL SUMMARY
Frontend Developer with 3+ years of experience building cross-platform mobile applications and responsive web interfaces using React Native and React.js. Skilled in Redux state management, Firebase integration, offline-first architecture, and REST API consumption. Built 2 production apps from scratch and contributed to 3 others, all live in client environments, consistently delivering within Agile sprint cycles.

TECHNOLOGIES
Frontend: React.js, React Native, Next.js, JavaScript, TypeScript, HTML5, CSS3, TailwindCSS
Backend: Node.js, Express.js
Mobile: React Native (Android & iOS), Firebase (FCM, Crashlytics, Realtime DB), Realm DB
Database: MongoDB, SQL, Firebase Realtime Database, Realm
Tools: Git, GitHub, Redux, Webpack, NPM, Figma, Adobe XD, VS Code

EXPERIENCE
Frontend Developer, Skyward Techno – Ahmedabad
July 2023 – May 2026
• Built EventTRAXR from scratch, a live event management app published on both the Google Play Store and Apple App Store, featuring QR-based attendee check-in, exhibitor lead capture, digital floor maps, and offline data storage using Realm DB that automatically synced with the server once the device regained network connectivity.
• Built ParkVantage from scratch, a real-time parking session management app, integrating Google Maps SDK with marker clustering so the map stayed smooth and responsive even when rendering thousands of parking location pins at once.
• Led the majority of feature development on Hetchint, a field service scheduling app, including GPS-based check-in flows, animated navigation drawer, visit logging, and an offline-first sync system using Firebase Realtime Database that allowed field agents to work uninterrupted in low connectivity areas with all data syncing automatically on reconnection.
• Used Redux to manage shared application state including user session data, API responses, and active screen state, within each app, which prevented data inconsistencies between screens and reduced the need to pass props across multiple component layers.
• Built automated PDF invoice generation and digital signature capture in PrakashPump, cutting the per-invoice completion time from 20 seconds to under 10 seconds, a 50% reduction, by eliminating manual data entry and printing steps.
• Added Firebase Crashlytics across projects, giving the team real-time crash reports and stack traces that allowed critical bugs to be identified and fixed within hours of each release.
• Contributed to MetroHRMS by building the authentication flow, role-based dashboard screens, and real-time notification delivery for employee-employer communication.
Tools Used: React Native, TypeScript, Redux, Realm DB, Firebase, REST APIs, Google Maps SDK, FCM, Crashlytics

React JS Developer, Promount Technologies LLP – Ahmedabad
Jan 2023 – June 2023
• Joined as a junior developer and built new UI features in React.js under senior guidance, translating Figma designs into pixel-accurate, reusable components used across the main web application.
• Connected React frontend components to backend REST APIs for the first time in a production setting, learning how to handle loading states, error responses, and data mapping between the UI and server.
• Refactored several older components during code reviews to remove duplicate API calls that were firing on every render, which improved page load behaviour and reduced unnecessary network traffic.
• Participated in daily code review sessions with senior developers, learning production standards for folder structure, component reusability, and clean state management in React.
Tools Used: React.js, JavaScript, HTML5, CSS3, Git

ACADEMIC PROJECTS
Car Pooling Android App
• Ride-sharing Android app with real-time Firebase integration for live ride matching and user authentication.
Tools Used: Android, Java, Firebase

Tour & Travel Booking Website
• Full-stack travel booking platform with package browsing, booking management, and user reviews.
Tools Used: HTML, CSS, JavaScript, Node.js, MongoDB

EDUCATION
DAIICT, MSc IT
Aug 2021 – May 2023
Chimanbhai Patel Institute of Computer Application, Gujarat University, BCA
June 2018 – May 2021`;

export function AppHeader({
  colors,
  isDark,
  onToggle,
  topInset,
}: {
  colors: Palette;
  isDark: boolean;
  onToggle: () => void;
  topInset: number;
}) {
  const [showResume, setShowResume] = useState(false);

  return (
    <>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            paddingTop: topInset,
          },
        ]}
      >
        <View style={styles.brandRow}>
          <View style={[styles.brandMark, { backgroundColor: colors.primary }]}>
            <Text style={styles.brandMarkText}>M</Text>
          </View>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>MyTestAp</Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>
              Your device, simplified
            </Text>
          </View>
        </View>

        <View style={styles.themeControl}>

          <Text style={[styles.themeText, { color: colors.text }]}>
            {isDark ? 'Dark' : 'Light'}
          </Text>
          <Switch
            value={isDark}
            onValueChange={onToggle}
            trackColor={{ false: '#B8C1D1', true: '#5271E6' }}
          />

                    <Pressable
            accessibilityRole="button"
            onPress={() => setShowResume(true)}
            style={[
              styles.infoButton,
              {
                borderColor: colors.border,
                backgroundColor: colors.cardMuted,
              },
            ]}
          >
            <Text style={[styles.infoButtonText, { color: colors.primary }]}>
              ⓘ
            </Text>
          </Pressable>

        </View>
      </View>

      <Modal
        visible={showResume}
        transparent
        animationType="fade"
        onRequestClose={() => setShowResume(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: colors.card }]}> 
            <Text style={[styles.modalTitle, { color: colors.text }]}>Resume</Text>

            <ScrollView
              style={styles.resumeScroll}
              contentContainerStyle={styles.resumeContent}
              showsVerticalScrollIndicator
              scrollEventThrottle={16}
            >
              <Text style={[styles.resumeText, { color: colors.text }]}>
                Jainam Shah
              </Text>
              <Text style={[styles.resumeMeta, { color: colors.muted }]}>
                Ahmedabad, India
              </Text>

              {resumeLinks.map(link => (
                <Pressable
                  key={link.label}
                  onPress={() => Linking.openURL(link.url)}
                  style={styles.linkRow}
                >
                  <Text style={[styles.linkLabel, { color: colors.muted }]}>
                    {link.label}:
                  </Text>
                  <Text style={[styles.linkText, { color: colors.primary }]}>
                    {link.value}
                  </Text>
                </Pressable>
              ))}

              <Text style={[styles.resumeText, { color: colors.text }]}>
                {'\n'}
                {resumeContent.replace(
                  'Jainam Shah\nAhmedabad, India\n\nPROFESSIONAL SUMMARY',
                  'PROFESSIONAL SUMMARY',
                )}
              </Text>
            </ScrollView>

            <Pressable
              style={[styles.modalClose, { backgroundColor: colors.primary }]}
              onPress={() => setShowResume(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 68,
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandMark: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandMarkText: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
  title: { fontSize: 18, fontWeight: '800' },
  subtitle: { fontSize: 12, marginTop: 2 },
  themeControl: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  themeText: { fontSize: 13, fontWeight: '600' },
  infoButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoButtonText: { fontSize: 15, fontWeight: '700', lineHeight: 18 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    padding: 18,
  },
  modalCard: {
    maxHeight: '86%',
    width: '100%',
    borderRadius: 18,
    padding: 18,
  },
  modalTitle: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  resumeScroll: {
    maxHeight: 480,
    minHeight: 200,
  },
  resumeContent: {
    paddingBottom: 8,
  },
  resumeText: {
    fontSize: 13,
    lineHeight: 20,
  },
  resumeMeta: {
    fontSize: 12,
    marginBottom: 10,
  },
  linkRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    alignItems: 'center',
  },
  linkLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginRight: 6,
  },
  linkText: {
    fontSize: 12,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  modalClose: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  modalCloseText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});
