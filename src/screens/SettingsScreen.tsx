import React, { useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import type { Palette } from '../theme';

export function SettingsScreen({ colors }: { colors: Palette }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState(new Date(2000, 0, 1));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [country, setCountry] = useState('India');
  const [showSuccess, setShowSuccess] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    birthDate: false,
    country: false,
  });

  const validateName = (value: string) => {
    if (!value.trim()) return 'Name is required.';
    if (value.trim().length < 2) return 'Name must be at least 2 characters.';
    return '';
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) return 'Email is required.';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value.trim())) return 'Enter a valid email address.';
    return '';
  };

  const validateBirthDate = (value: Date) => {
    const today = new Date();
    let age = today.getFullYear() - value.getFullYear();
    const monthDiff = today.getMonth() - value.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < value.getDate())) {
      age -= 1;
    }

    if (Number.isNaN(value.getTime())) return 'Please select a valid birthdate.';
    if (age < 18) return 'You must be at least 18 years old.';
    return '';
  };

  const validateCountry = (value: string) => {
    if (!value.trim()) return 'Please select a country.';
    return '';
  };

  const errors = {
    name: validateName(name),
    email: validateEmail(email),
    birthDate: validateBirthDate(birthDate),
    country: validateCountry(country),
  };

  const isFormValid = Object.values(errors).every(error => !error);

  const inputStyle = (field: keyof typeof errors) => [
    styles.input,
    {
      backgroundColor: colors.card,
      borderColor: touched[field] && errors[field] ? '#DC2626' : colors.border,
      color: colors.text,
    },
  ];

  const handleSave = () => {
    setTouched({ name: true, email: true, birthDate: true, country: true });
    if (!isFormValid) return;

    setShowSuccess(true);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.screen,
          { backgroundColor: colors.background },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.profileCard, { backgroundColor: colors.primary }]}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>
              {name ? name.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
          <View style={styles.profileContent}>
            <Text style={styles.profileTitle}>{name || 'Your profile'}</Text>
            <Text style={styles.profileSubtitle}>
              {email || 'Add your details below'}
            </Text>
          </View>
        </View>

        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        <Text style={[styles.description, { color: colors.muted }]}>
          Personalize your profile and keep it ready for later.
        </Text>

        <Text style={[styles.sectionLabel, { color: colors.muted }]}>
          PROFILE INFORMATION
        </Text>

        <Text style={[styles.label, { color: colors.text }]}>Name</Text>
        <TextInput
          value={name}
          onChangeText={value => {
            setName(value);
            if (touched.name) setTouched(current => ({ ...current, name: true }));
          }}
          onBlur={() => setTouched(current => ({ ...current, name: true }))}
          placeholder="Enter your name"
          placeholderTextColor={colors.muted}
          style={inputStyle('name')}
        />
        {touched.name && errors.name ? (
          <Text style={styles.errorText}>{errors.name}</Text>
        ) : null}

        <Text style={[styles.label, { color: colors.text }]}>Email address</Text>
        <TextInput
          value={email}
          onChangeText={value => {
            setEmail(value);
            if (touched.email) setTouched(current => ({ ...current, email: true }));
          }}
          onBlur={() => setTouched(current => ({ ...current, email: true }))}
          placeholder="Enter email address"
          placeholderTextColor={colors.muted}
          keyboardType="email-address"
          autoCapitalize="none"
          style={inputStyle('email')}
        />
        {touched.email && errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}

        <Text style={[styles.label, { color: colors.text }]}>Birthdate</Text>
        <Pressable
          onPress={() => {
            setTouched(current => ({ ...current, birthDate: true }));
            setShowDatePicker(true);
          }}
          style={inputStyle('birthDate')}
        >
          <Text style={[styles.dateText, { color: colors.text }]}>
            {birthDate.toLocaleDateString()}
          </Text>
          <Text style={[styles.calendarMark, { color: colors.primary }]}>#</Text>
        </Pressable>
        {touched.birthDate && errors.birthDate ? (
          <Text style={styles.errorText}>{errors.birthDate}</Text>
        ) : null}
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            maximumDate={new Date()}
            onChange={(_, date) => {
              setShowDatePicker(Platform.OS === 'ios');
              if (date) {
                setBirthDate(date);
                setTouched(current => ({ ...current, birthDate: true }));
              }
            }}
          />
        )}

        <Text style={[styles.label, { color: colors.text }]}>Country</Text>
        <View
          style={[
            styles.pickerBox,
            {
              backgroundColor: colors.card,
              borderColor: touched.country && errors.country ? '#DC2626' : colors.border,
            },
          ]}
        >
          <Picker
            selectedValue={country}
            onValueChange={value => {
              setCountry(value);
              setTouched(current => ({ ...current, country: true }));
            }}
            dropdownIconColor={colors.text}
            style={{ color: colors.text }}
          >
            <Picker.Item label="India" value="India" />
            <Picker.Item label="United States" value="United States" />
            <Picker.Item label="United Kingdom" value="United Kingdom" />
            <Picker.Item label="Australia" value="Australia" />
          </Picker>
        </View>
        {touched.country && errors.country ? (
          <Text style={styles.errorText}>{errors.country}</Text>
        ) : null}

        <Pressable
          style={[
            styles.saveButton,
            { backgroundColor: isFormValid ? colors.primary : '#A1A1AA' },
          ]}
          disabled={!isFormValid}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save changes</Text>
          <Text style={styles.saveArrow}>{'>'}</Text>
        </Pressable>
      </ScrollView>

      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccess(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: colors.card }]}>
            <View
              style={[styles.successIcon, { backgroundColor: colors.success }]}
            >
              <Text style={styles.successIconText}>OK</Text>
            </View>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Details saved
            </Text>
            <Text style={[styles.modalMessage, { color: colors.muted }]}>
              Your profile information has been updated successfully.
            </Text>
            <Pressable
              style={[styles.modalButton, { backgroundColor: colors.primary }]}
              onPress={() => setShowSuccess(false)}
            >
              <Text style={styles.modalButtonText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, padding: 20, paddingBottom: 32 },
  profileCard: {
    borderRadius: 21,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 27,
    shadowColor: '#312E81',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  profileAvatar: {
    width: 53,
    height: 53,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  profileAvatarText: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },
  profileContent: { marginLeft: 13, flex: 1 },
  profileTitle: { color: '#FFFFFF', fontWeight: '800', fontSize: 18 },
  profileSubtitle: { color: '#E0E7FF', marginTop: 4, fontSize: 13 },
  title: { fontSize: 27, fontWeight: '800' },
  description: { fontSize: 14, lineHeight: 21, marginTop: 6, marginBottom: 23 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 15,
  },
  label: { fontSize: 14, fontWeight: '800', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    minHeight: 53,
    paddingHorizontal: 15,
    justifyContent: 'center',
    fontSize: 15,
    marginBottom: 8,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    marginBottom: 12,
    marginTop: 2,
  },
  dateText: { fontSize: 15 },
  calendarMark: {
    position: 'absolute',
    right: 15,
    fontSize: 17,
    fontWeight: '800',
  },
  pickerBox: {
    borderWidth: 1,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 26,
  },
  saveButton: {
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#312E81',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  saveArrow: { color: '#FFFFFF', fontSize: 19, fontWeight: '800' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.62)',
    justifyContent: 'center',
    padding: 25,
  },
  modalCard: { borderRadius: 24, padding: 25, alignItems: 'center' },
  successIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
  modalTitle: { fontSize: 22, fontWeight: '800', marginTop: 17 },
  modalMessage: {
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 8,
  },
  modalButton: {
    borderRadius: 14,
    paddingVertical: 14,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 23,
  },
  modalButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});
