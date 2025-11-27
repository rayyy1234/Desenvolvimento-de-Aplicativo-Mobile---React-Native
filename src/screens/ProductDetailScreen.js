import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductDetailScreen({ route, navigation }) {
  const { product, addToCart } = route.params;

  const handleAddToCart = () => {
    addToCart(product);
    alert('Produto adicionado ao carrinho!');
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>R$ {product.price}</Text>
        <Text style={styles.artisan}>Artesão: {product.artisan}</Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Descrição</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Material</Text>
          <Text style={styles.material}>{product.material}</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.cartText}>Adicionar ao Carrinho</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  image: {
    width: '100%',
    height: 300
  },
  content: {
    padding: 20
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B4513',
    marginTop: 8
  },
  artisan: {
    fontSize: 16,
    color: '#666',
    marginTop: 4
  },
  infoBox: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginTop: 20
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666'
  },
  material: {
    fontSize: 16,
    color: '#666'
  },
  buttons: {
    marginTop: 30,
    gap: 12
  },
  cartButton: {
    backgroundColor: '#8B4513',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  cartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  backButton: {
    backgroundColor: '#e9ecef',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666'
  },
  backText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold'
  }
});