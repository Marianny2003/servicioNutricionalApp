import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Info {
  label?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  onBlur?: (value: string) => void; 
  onFocus?: (value: string) => void; 
  error?: string;
  icon?: string;
  iconError?: string;
}

export default function Input(props: Info) {
  const [isFocused, setIsFocused] = useState(false);  

  const handleFocus = () => {
    setIsFocused(true);  
    if (props.onFocus) {
      props.onFocus(props.value || ''); 
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur(props.value || '');
    }
  };

  return (
    <View style={styleInput.container}>
      <View style={styleInput.textLabel}>
        {props.icon && <FontAwesome name={props.icon} size={24} color="#0066CC" />}
        {props.label && <Text style={styleInput.label}>{props.label}</Text>}
      </View>

      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        onBlur={handleBlur} 
        onFocus={handleFocus} 
        style={[
          styleInput.campo,
          isFocused && styleInput.focusedCampo 
        ]}
      />

      <View style={styleInput.textLabel}>
        {props.iconError && <FontAwesome name={props.iconError} size={16} color="#df0000" />}
        {props.error && <Text style={styleInput.error}>{props.error}</Text>}
      </View>
    </View>
  );
}

const styleInput = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#0066CC',
    marginLeft: 8, 
    fontWeight: 'bold',
  },
  campo: {
    borderWidth: 1, 
    borderColor: '#cfcfcf',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 5,
  },
  focusedCampo: {
    borderColor: '#0066CC',  
    shadowColor: '#00000054',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  error: {
    color: '#df0000',
    fontSize: 14,
    marginTop: 5,
    marginLeft: 8,
  },
  textLabel: {
    flexDirection: 'row',  
    alignItems: 'center', 
    marginBottom: 5,  
  },
});
