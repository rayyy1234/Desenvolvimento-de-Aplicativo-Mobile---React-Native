import * as SQLite from 'expo-sqlite';

// Abre o banco de dados
const db = SQLite.openDatabaseSync('artemania.db');

export const initDatabase = async () => {
  try {
    console.log('Iniciando banco de dados...');
    
    // Criar tabela de produtos
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        image TEXT,
        artisan TEXT,
        location TEXT,
        material TEXT,
        rating REAL,
        category TEXT
      );
    `);
    
    console.log('Tabela products criada com sucesso');
    
    // Criar tabela do carrinho
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        quantity INTEGER DEFAULT 1,
        added_date TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Tabela cart_items criada com sucesso');
    
    // Inserir dados de exemplo
    await insertSampleData();
    
    return true;
  } catch (error) {
    console.log('Erro ao criar tabelas:', error);
    return false;
  }
};

const insertSampleData = async () => {
  try {
    // Verificar se já existem produtos
    const result = await db.getFirstAsync('SELECT COUNT(*) as count FROM products');
    
    if (result.count === 0) {
      console.log('Inserindo dados de exemplo...');
      
      const sampleProducts = [
        {
          name: 'Vaso de Cerâmica Artesanal',
          description: 'Vaso único feito à mão com técnica tradicional, perfeito para decorar qualquer ambiente.',
          price: 89.90,
          image: 'https://images.unsplash.com/photo-1589987607627-68c02776bc29?w=400',
          artisan: 'Maria Ceramista',
          location: 'São Paulo, SP',
          material: 'Cerâmica',
          rating: 4.8,
          category: 'Decoração'
        },
        {
          name: 'Colar de Sementes Naturais',
          description: 'Colar artesanal feito com sementes naturais da Amazônia, peça única e sustentável.',
          price: 45.00,
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
          artisan: 'Ana Artesã',
          location: 'Manaus, AM',
          material: 'Sementes',
          rating: 4.9,
          category: 'Acessórios'
        },
        {
          name: 'Cesta de Palha Trançada',
          description: 'Cesta tradicional feita com palha natural, ideal para organização ou como peça decorativa.',
          price: 65.00,
          image: 'https://images.unsplash.com/photo-1586023492125-27a3d34a9844?w=400',
          artisan: 'João Trançador',
          location: 'Bahia, BA',
          material: 'Palha',
          rating: 4.7,
          category: 'Utilidades'
        },
        {
          name: 'Escultura em Madeira',
          description: 'Escultura única esculpida à mão em madeira de reflorestamento, representando a cultura local.',
          price: 120.00,
          image: 'https://images.unsplash.com/photo-1564936281293-50176be9c313?w=400',
          artisan: 'Carlos Escultor',
          location: 'Minas Gerais, MG',
          material: 'Madeira',
          rating: 5.0,
          category: 'Arte'
        }
      ];

      // Inserir cada produto individualmente
      for (const product of sampleProducts) {
        await db.runAsync(
          `INSERT INTO products (name, description, price, image, artisan, location, material, rating, category) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            product.name,
            product.description,
            product.price,
            product.image,
            product.artisan,
            product.location,
            product.material,
            product.rating,
            product.category
          ]
        );
      }
      
      console.log('Dados de exemplo inseridos com sucesso');
    } else {
      console.log('Dados já existem, pulando inserção');
    }
  } catch (error) {
    console.log('Erro ao inserir dados de exemplo:', error);
  }
};

// Funções para produtos
export const getProducts = async () => {
  try {
    const result = await db.getAllAsync('SELECT * FROM products');
    console.log('Produtos carregados:', result.length);
    return result;
  } catch (error) {
    console.log('Erro ao buscar produtos:', error);
    return [];
  }
};

// Funções para carrinho
export const getCartItems = async () => {
  try {
    const result = await db.getAllAsync(
      `SELECT ci.*, p.name, p.price, p.image, p.artisan 
       FROM cart_items ci 
       JOIN products p ON ci.product_id = p.id`
    );
    return result;
  } catch (error) {
    console.log('Erro ao buscar itens do carrinho:', error);
    return [];
  }
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    // Verificar se o produto já está no carrinho
    const existingItem = await db.getFirstAsync(
      'SELECT * FROM cart_items WHERE product_id = ?',
      [productId]
    );

    if (existingItem) {
      // Atualizar quantidade se já existir
      await db.runAsync(
        'UPDATE cart_items SET quantity = quantity + ? WHERE product_id = ?',
        [quantity, productId]
      );
    } else {
      // Inserir novo item
      await db.runAsync(
        'INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)',
        [productId, quantity]
      );
    }
    return { success: true };
  } catch (error) {
    console.log('Erro ao adicionar ao carrinho:', error);
    return { success: false, error };
  }
};

export const removeFromCart = async (productId) => {
  try {
    await db.runAsync(
      'DELETE FROM cart_items WHERE product_id = ?',
      [productId]
    );
    return { success: true };
  } catch (error) {
    console.log('Erro ao remover do carrinho:', error);
    return { success: false, error };
  }
};

export const updateCartQuantity = async (productId, quantity) => {
  try {
    await db.runAsync(
      'UPDATE cart_items SET quantity = ? WHERE product_id = ?',
      [quantity, productId]
    );
    return { success: true };
  } catch (error) {
    console.log('Erro ao atualizar quantidade:', error);
    return { success: false, error };
  }
};