import React, { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import type { Palette } from '../theme';

type DeviceDetail = [label: string, value: string];

export function HomeScreen({ colors }: { colors: Palette }) {
  const [details, setDetails] = useState<DeviceDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [areDetailsVisible, setAreDetailsVisible] = useState(false);

  const loadDeviceDetails = async () => {
    setIsLoading(true);

    try {
      if (Platform.OS === 'android') {
        const permission = await request(PERMISSIONS.ANDROID.READ_PHONE_STATE);
        if (permission !== RESULTS.GRANTED) {
          Alert.alert(
            'Permission needed',
            'Please allow phone access to view device details.',
          );
          return;
        }
      }

      const uniqueId = await DeviceInfo.getUniqueId();
      setDetails([
        [
          'Operating system',
          `${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}`,
        ],
        ['Device name', await DeviceInfo.getDeviceName()],
        ['Device ID', uniqueId],
        ['Brand', DeviceInfo.getBrand()],
        ['Model', DeviceInfo.getModel()],
        ['App version', DeviceInfo.getVersion()],
      ]);
      setAreDetailsVisible(true);
    } catch {
      Alert.alert(
        'Unable to read details',
        'Please try again after allowing permission.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const openPhotos = async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (response.errorCode) {
      Alert.alert(
        'Gallery could not open',
        response.errorMessage || 'Please try again.',
      );
    }
  };

  const hasDetails = details.length > 0;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.screen,
        { backgroundColor: colors.background },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.sectionHeader}>
        <View>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Quick actions
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.muted }]}>
            Get things done in a tap
          </Text>
        </View>
      </View>

      <Pressable
        style={[styles.primaryAction, { backgroundColor: colors.primary }]}
        onPress={
          hasDetails
            ? () => setAreDetailsVisible(value => !value)
            : loadDeviceDetails
        }
      >
        <View style={styles.actionIcon}>
          <Text style={styles.actionIconText}>i</Text>
        </View>
        <View style={styles.actionTextContainer}>
          <Text style={styles.primaryActionTitle}>
            {hasDetails && areDetailsVisible
              ? 'Hide device details'
              : hasDetails
              ? 'Show device details'
              : 'Show device details'}
          </Text>
          <Text style={styles.primaryActionSubtitle}>
            {isLoading
              ? 'Collecting information...'
              : hasDetails
              ? 'Your device information is ready'
              : 'View your phone information'}
          </Text>
        </View>
        <Text style={styles.actionArrow}>{'>'}</Text>
      </Pressable>

      <Pressable
        style={[
          styles.secondaryAction,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
        onPress={openPhotos}
      >
        <View
          style={[styles.galleryIcon, { backgroundColor: colors.primarySoft }]}
        >
          <Text style={[styles.galleryIconText, { color: colors.primary }]}>
            #
          </Text>
        </View>
        <View style={styles.actionTextContainer}>
          <Text style={[styles.secondaryActionTitle, { color: colors.text }]}>
           Photo
          </Text>
          <Text
            style={[styles.secondaryActionSubtitle, { color: colors.muted }]}
          >
            Choose a photo from this device
          </Text>
        </View>
        <Text style={[styles.secondaryArrow, { color: colors.muted }]}>
          {'>'}
        </Text>
      </Pressable>

      {isLoading && (
        <View
          style={[styles.loadingCard, { backgroundColor: colors.cardMuted }]}
        >
          <Text style={[styles.loadingText, { color: colors.primary }]}>
            Loading device information....
          </Text>
        </View>
      )}

      {hasDetails && areDetailsVisible && (
        <View style={styles.detailsSection}>
          <View style={styles.detailsHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Device details
            </Text>
            <View
              style={[
                styles.readyPill,
                { backgroundColor: colors.primarySoft },
              ]}
            >
              <Text style={[styles.readyText, { color: colors.primary }]}>
                READY
              </Text>
            </View>
          </View>
          {details.map(([label, value]) => (
            <View
              key={label}
              style={[
                styles.detailRow,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.detailLabel, { color: colors.muted }]}>
                {label}
              </Text>
              <Text
                style={[styles.detailValue, { color: colors.text }]}
                numberOfLines={1}
              >
                {value}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, padding: 20, paddingBottom: 32 },
  sectionHeader: { marginBottom: 13 },
  sectionTitle: { fontSize: 20, fontWeight: '800' },
  sectionSubtitle: { fontSize: 13, marginTop: 4 },
  primaryAction: {
    borderRadius: 18,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#312E81',
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 3,
  },
  actionIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIconText: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  actionTextContainer: { flex: 1, marginLeft: 13 },
  primaryActionTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  primaryActionSubtitle: { color: '#E0E7FF', fontSize: 12, marginTop: 4 },
  actionArrow: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  secondaryAction: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  galleryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryIconText: { fontSize: 20, fontWeight: '800' },
  secondaryActionTitle: { fontSize: 16, fontWeight: '800' },
  secondaryActionSubtitle: { fontSize: 12, marginTop: 4 },
  secondaryArrow: { fontSize: 18, fontWeight: '800' },
  loadingCard: {
    borderRadius: 14,
    padding: 14,
    marginTop: 16,
    alignItems: 'center',
  },
  loadingText: { fontWeight: '700', fontSize: 13 },
  detailsSection: { marginTop: 28 },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  readyPill: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
  readyText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  detailRow: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginBottom: 9,
  },
  detailLabel: { fontSize: 12, fontWeight: '600', marginBottom: 5 },
  detailValue: { fontSize: 15, fontWeight: '700' },
});
