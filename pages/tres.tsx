import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react'


const alturaStatusBar = StatusBar.currentHeight
const KEY_GPT = 'SUA_CHAVE_DE_API';

export function localizarLugar() {

  const [load, defLoad] = useState(false);
  const [receita, defReceita] = useState("");

  const [igr1, defIgr1] = useState("");
  const [igr2, defIgr2] = useState("");
  const [igr3, defIgr3] = useState("");
  const [igr4, defIgr4] = useState("");
  const [ocasiao, defOcasiao] = useState("");

  async function gerarReceita() {
    if (igr1 === "" || igr2 === "" || igr3 === "" || igr4 === "" || ocasiao === "") {
      Alert.alert("Atenção", "Informe todos as localizações!", [{ text: "Beleza!" }])
      return;
    }
    defReceita("");
    defLoad(true);
    Keyboard.dismiss();

    const prompt = `Sugira um ponto turistico detalhada em ${ocasiao} usando as localizações: ${igr1}, ${igr2}, ${igr3} e ${igr4} e pesquise no YouTube. Caso encontre, informe o link.`;

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY_GPT}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.20,
        max_tokens: 500,
        top_p: 1,
      })
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data.choices[0].message.content);
        defReceita(data.choices[0].message.content)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        defLoad(false);
      })
  }

  return (
    <View style={ESTILOS.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#F1F1F1" />
      <Text style={ESTILOS.header}>local turistico</Text>
      <View style={ESTILOS.form}>
        <Text style={ESTILOS.label}>Insira todas as cidades com ponto turistico e tenha um video completo de cada:</Text>
        <TextInput
          placeholder="Ingrediente 1"
          style={ESTILOS.input}
          value={igr1}
          onChangeText={(texto) => defIgr1(texto)}
        />
        <TextInput
          placeholder="Ingrediente 2"
          style={ESTILOS.input}
          value={igr2}
          onChangeText={(texto) => defIgr2(texto)}
        />
        <TextInput
          placeholder="Ingrediente 3"
          style={ESTILOS.input}
          value={igr3}
          onChangeText={(texto) => defIgr3(texto)}
        />
        <TextInput
          placeholder="Ingrediente 4"
          style={ESTILOS.input}
          value={igr4}
          onChangeText={(texto) => defIgr4(texto)}
        />
      </View>

      <TouchableOpacity style={ESTILOS.button} onPress={gerarReceita}>
        <Text style={ESTILOS.buttonText}>Gerar receita</Text>
        <MaterialCommunityIcons name="food-variant" size={24} color="#FFF" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4, }} style={ESTILOS.containerScroll} showsVerticalScrollIndicator={false} >
        {load && (
          <View style={ESTILOS.content}>
            <Text style={ESTILOS.title}>Procurando lugares...</Text>
            <ActivityIndicator color="#000" size="large" />
          </View>
        )}

        {receita && (
          <View style={ESTILOS.content}>
            <Text style={ESTILOS.title}>Seus lugares 👇</Text>
            <Text style={{ lineHeight: 24 }}>{receita} </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const ESTILOS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: Platform.OS === 'android' ? alturaStatusBar : 54
  },
  form: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#a21309',
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#f84226',
    width: '90%',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  },
  content: {
    backgroundColor: '#FFF',
    padding: 16,
    width: '100%',
    marginTop: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14
  },
  containerScroll: {
    width: '90%',
    marginTop: 8,
  }
})