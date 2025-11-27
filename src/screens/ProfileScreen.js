import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Meu Perfil</Text>
      
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>João Silva</Text>
        
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>joao@artemania.com</Text>
        
        <Text style={styles.label}>Telefone:</Text>
        <Text style={styles.value}>(11) 99999-9999</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>📦 Meus Pedidos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>❤️ Favoritos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>⚙️ Configurações</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f5f5f5' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    margin: 20,
    color: '#8B4513'
  },
  profileInfo: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333'
  },
  value: {
    color: '#666',
    marginBottom: 5
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  menuText: {
    fontSize: 16
  },
  backButton: { 
    backgroundColor: '#8B4513', 
    padding: 15, 
    borderRadius: 10, 
    margin: 10 
  },
  backText: { 
    color: 'white', 
    textAlign: 'center', 
    fontWeight: 'bold' 
  }
});