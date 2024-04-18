import { Text, TouchableOpacity, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { CARD_SIDE, CreditCard } from '@/components/credit-card';
import { styles } from './styles';
import { Input } from '@/components/input';
import { useState } from 'react';

export function Payment() {
  const cardSide = useSharedValue(CARD_SIDE.front);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expires, setExpires] = useState('');
  const [code, setCode] = useState('');

  function showFrontCard() {
    cardSide.value = CARD_SIDE.front;
  }

  function showBackCard() {
    cardSide.value = CARD_SIDE.back;
  }

  function handleFlipCard() {
    if (cardSide.value === CARD_SIDE.front) {
      showBackCard();
    } else {
      showFrontCard();
    }
  }

  return (
    <View style={styles.container}>
      <CreditCard
        cardSide={cardSide}
        cardData={{
          code,
          expires,
          name,
          number: number.replace(/(\d{4})(?=\d)/g, '$1 '),
        }}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleFlipCard}
      >
        <Text>Inverter</Text>
      </TouchableOpacity>

      <View style={styles.form}>
        <Input
          value={name}
          placeholder="Nome do titular"
          onChangeText={setName}
          onFocus={showFrontCard}
        />
        <Input
          value={number}
          placeholder="Número do cartão"
          keyboardType="numeric"
          maxLength={16}
          onChangeText={setNumber}
          onFocus={showBackCard}
        />

        <View style={styles.inputsInLine}>
          <Input
            value={expires}
            placeholder="01/02"
            style={styles.smallInput}
            onChangeText={setExpires}
            onFocus={showBackCard}
          />
          <Input
            value={code}
            placeholder="123"
            style={styles.smallInput}
            keyboardType="numeric"
            onChangeText={setCode}
            onFocus={showBackCard}
          />
        </View>
      </View>
    </View>
  );
}
