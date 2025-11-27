import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const products = [
    {
      id: 1,
      name: 'Vaso de Cerâmica',
      price: 89.90,
      image: 'https://openbox.vtexassets.com/arquivos/ids/222222-976-976/146922_Vaso-Alcas-em-Ceramica-Terracota_1.jpg?v=638469942166130000',
      artisan: 'Maria Silva',
      description: 'Vaso artesanal feito com argila natural, pintado à mão.',
      material: 'Cerâmica'
    },
    {
      id: 2,
      name: 'Colar de Pérolas',
      price: 45.00,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
      artisan: 'Ana Costa',
      description: 'Colar com pérolas naturais do Canadá.',
      material: 'Sementes'
    },
    {
      id: 3,
      name: 'Cesta de Palha',
      price: 65.00,
      image: 'https://down-br.img.susercontent.com/file/4cedf90097d74b030e43095b6f71b626',
      artisan: 'João Santos',
      description: 'Cesta trançada manualmente com palha natural.',
      material: 'Palha'
    },
    {
      id: 4,
      name: 'Escultura em Madeira',
      price: 120.00,
      image: 'https://m.media-amazon.com/images/I/51lDhj4eupL._AC_SY879_.jpg',
      artisan: 'Carlos Lima',
      description: 'Escultura única em madeira de reflorestamento.',
      material: 'Madeira'
    },
    {
      id: 5,
      name: 'Tapete Artesanal',
      price: 150.00,
      image: 'https://m.media-amazon.com/images/I/8177Kut-aNL._AC_SX679_.jpg',
      artisan: 'Rosa Oliveira',
      description: 'Tapete feito com lã natural, cores vibrantes.',
      material: 'Lã'
    },
    {
      id: 6,
      name: 'Boneca de Pano',
      price: 35.00,
      image: 'https://images.tcdn.com.br/img/img_prod/1162865/boneca_de_pano_jardim_encantado_trio_rosa_1133_1_0425b38970f88325ffba0cc363d3bd54.jpg',
      artisan: 'Clara Mendes',
      description: 'Boneca artesanal feita com tecido 100% algodão.',
      material: 'Tecido'
    },
    {
      id: 7,
      name: 'Jogo de Xícaras',
      price: 75.00,
      image: 'https://copaecia.cdn.magazord.com.br/img/2024/06/produto/8298/versailles-marie-309305-309306-309573-309574-jaipur-308878-2.jpg?ims=600x600',
      artisan: 'Pedro Almeida',
      description: 'Conjunto de xícaras em cerâmica pintadas à mão.',
      material: 'Cerâmica'
    },
    {
      id: 8,
      name: 'Carteira de Couro',
      price: 55.00,
      image: 'https://cdn.awsli.com.br/600x1000/2454/2454790/produto/261169540/img_20240328_105619445-7o62zn7e20.jpg',
      artisan: 'Marcos Ribeiro',
      description: 'Carteira em couro legítimo, costurada à mão.',
      material: 'Couro'
    },
    {
      id: 9,
      name: 'Porta Joias',
      price: 40.00,
      image: 'https://i.pinimg.com/474x/b3/44/bd/b344bde770afff5ed48dc959226fe235.jpg',
      artisan: 'Sofia Costa',
      description: 'Caixa organizadora para joias em madeira maciça.',
      material: 'Madeira'
    },
    {
      id: 10,
      name: 'Pulseira de Prata',
      price: 85.00,
      image: 'https://cdn.awsli.com.br/2500x2500/1931/1931120/produto/111965939/img_0024-xmnc3tw33r.jpeg',
      artisan: 'Lucas Ferreira',
      description: 'Pulseira em prata 925 com detalhes artesanais.',
      material: 'Prata'
    },
    {
      id: 11,
      name: 'Quadro Bordado',
      price: 95.00,
      image: 'https://img.elo7.com.br/product/600x380/4FD4D44/quadro-bordado-nossa-senhora-aparecida.jpg',
      artisan: 'Beatriz Santos',
      description: 'Quadro com bordado manual, design exclusivo.',
      material: 'Linho'
    },
    {
      id: 12,
      name: 'Vela Aromática',
      price: 28.00,
      image: 'https://cdn.awsli.com.br/600x1000/2393/2393947/produto/172200259/dsc_9644--1--cq5t30ionk.jpg',
      artisan: 'Ricardo Nunes',
      description: 'Vela artesanal com essências naturais.',
      material: 'Cera de Abelha'
    }
  ];


export default function HomeScreen({ navigation }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? {...item, quantity: item.quantity + 1}
          : item
      ));
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
    alert('Adicionado ao carrinho!');
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item, addToCart })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.artisan}>Por: {item.artisan}</Text>
      <Text style={styles.price}>R$ {item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ArteMania</Text>
      <Text style={styles.subtitle}>Produtos Artesanais Únicos</Text>
      
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity 
        style={styles.cartButton}
        onPress={() => navigation.navigate('Cart', { cart, setCart })}
      >
        <Text style={styles.cartText}>🛒 Carrinho ({cart.reduce((total, item) => total + item.quantity, 0)})</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa',
    paddingTop: 50
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#8B4513' 
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20
  },
  list: {
    padding: 10
  },
  productCard: { 
    flex: 1, 
    margin: 8, 
    padding: 12, 
    backgroundColor: 'white', 
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  image: { 
    width: 120, 
    height: 120, 
    borderRadius: 8 
  },
  name: { 
    fontWeight: 'bold', 
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14
  },
  artisan: { 
    color: '#666', 
    fontSize: 12,
    marginTop: 4
  },
  price: { 
    fontWeight: 'bold', 
    color: '#8B4513', 
    marginTop: 6,
    fontSize: 16
  },
  cartButton: { 
    backgroundColor: '#8B4513', 
    padding: 16, 
    margin: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  cartText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});