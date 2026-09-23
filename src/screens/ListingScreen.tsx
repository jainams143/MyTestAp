import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {faker} from '@faker-js/faker';
import type {Palette} from '../theme';

const people = Array.from({length: 16}, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  city: faker.location.city(),
}));

export function ListingScreen({colors}: {colors: Palette}) {
  return (
    <FlatList
      data={people}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.list, {backgroundColor: colors.background}]}
      ListHeaderComponent={
        <>
          <View style={styles.headingRow}>
            <View>
              <Text style={[styles.title, {color: colors.text}]}>People</Text>
              <Text style={[styles.description, {color: colors.muted}]}>Your sample contacts</Text>
            </View>
            <View style={[styles.countBadge, {backgroundColor: colors.primarySoft}]}><Text style={[styles.countText, {color: colors.primary}]}>{people.length} contacts</Text></View>
          </View>
          <View style={[styles.infoCard, {backgroundColor: colors.cardMuted}]}>
            <View style={[styles.infoIcon, {backgroundColor: colors.primary}]}><Text style={styles.infoIconText}>*</Text></View>
            <Text style={[styles.infoText, {color: colors.text}]}>Explore people generated especially for this demo.</Text>
          </View>
        </>
      }
      renderItem={({item, index}) => (
        <View style={[styles.card, {backgroundColor: colors.card, borderColor: colors.border}]}>
          <View style={[styles.avatar, {backgroundColor: index % 2 === 0 ? colors.primary : colors.success}]}><Text style={styles.avatarText}>{item.name.charAt(0)}</Text></View>
          <View style={styles.content}>
            <Text style={[styles.name, {color: colors.text}]}>{item.name}</Text>
            <Text style={[styles.meta, {color: colors.muted}]} numberOfLines={1}>{item.email}</Text>
            <View style={styles.locationRow}><Text style={[styles.locationDot, {color: colors.primary}]}>o</Text><Text style={[styles.location, {color: colors.muted}]}>{item.city}</Text></View>
          </View>
          <Text style={[styles.chevron, {color: colors.muted}]}>{'>'}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {padding: 20, paddingBottom: 32}, headingRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 17}, title: {fontSize: 27, fontWeight: '800'}, description: {fontSize: 14, marginTop: 4}, countBadge: {borderRadius: 20, paddingHorizontal: 11, paddingVertical: 7}, countText: {fontSize: 12, fontWeight: '800'},
  infoCard: {borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 7}, infoIcon: {width: 31, height: 31, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}, infoIconText: {color: '#FFFFFF', fontSize: 17, fontWeight: '800'}, infoText: {fontSize: 13, lineHeight: 18, fontWeight: '600', flex: 1, marginLeft: 10},
  card: {borderWidth: 1, borderRadius: 18, padding: 14, marginTop: 11, flexDirection: 'row', alignItems: 'center', shadowColor: '#172033', shadowOpacity: 0.04, shadowRadius: 8, elevation: 1}, avatar: {width: 46, height: 46, borderRadius: 15, alignItems: 'center', justifyContent: 'center'}, avatarText: {fontSize: 18, fontWeight: '800', color: '#FFFFFF'}, content: {marginLeft: 13, flex: 1}, name: {fontSize: 16, fontWeight: '800'}, meta: {fontSize: 13, marginTop: 4}, locationRow: {flexDirection: 'row', alignItems: 'center', marginTop: 4}, locationDot: {fontSize: 12, fontWeight: '800', marginRight: 4}, location: {fontSize: 12}, chevron: {fontSize: 18, fontWeight: '800', marginLeft: 7},
});
