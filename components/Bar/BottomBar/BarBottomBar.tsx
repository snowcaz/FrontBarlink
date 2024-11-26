import React, { useState, useEffect } from 'react'; 
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

const BarBottomBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<number>(0); // Estado para manejar la cantidad de notificaciones

  // Función para obtener las notificaciones (simulación por ahora)
  useEffect(() => {
    // Simula recibir una notificación después de 5 segundos (para pruebas)
    setTimeout(() => {
      setNotifications(prev => prev + 1);
    }, 5000);
  }, []);

  const getTabColor = (tabRoute: string) => {
    // Cambia el color si la ruta actual incluye la ruta del tab
    return pathname.startsWith(tabRoute) ? '#EF233C' : '#747272'; 
  };

  const getTextStyle = (tabRoute: string) => {
    // Cambia el estilo del texto según la ruta
    return pathname.startsWith(tabRoute) ? styles.selectedIconText : styles.iconText;
  };

  const handleNavigation = (route: string) => {
    if (!pathname.startsWith(route)) {
      router.push(route);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleNavigation('/bar/notifications')}>
        <View style={styles.iconContainer}>
          <Ionicons name="notifications-outline" size={24} color={getTabColor('/bar/notifications')} />
          {/* Mostrar la cantidad de notificaciones */}
          <Text style={getTextStyle('/bar/notifications')}>
            Notificaciones {notifications > 0 ? `(${notifications})` : ''}
          </Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => handleNavigation('/bar/orders/Orders')}>
        <View style={styles.iconContainer}>
          <Ionicons name="list-outline" size={24} color={getTabColor('/bar/orders/Orders')} />
          <Text style={getTextStyle('/bar/orders')}>Pedidos</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E4E5E1',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    color: '#747272',
  },
  selectedIconText: {
    fontSize: 12,
    color: '#EF233C',
  },
});

export default BarBottomBar;
