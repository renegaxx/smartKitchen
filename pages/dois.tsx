import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react'


const alturaStatusBar = StatusBar.currentHeight
const KEY_GPT = 'SUA_CHAVE_DE_API';

export function escolherPeixe() {

  const [load, defLoad] = useState(false);
  const [receita, defReceita] = useState("");

  const [pex1, defPex1] = useState("");
  const [pex2, defPex2] = useState("");
  const [pex3, defPex3] = useState("");
  const [pex4, defPex4] = useState("");
  const [ocasiao, defOcasiao] = useState("");

  async function gerarReceita() {
    if (pex1 === "" || pex2 === "" || pex3 === "" || pex4 === "" || ocasiao === "") {
      Alert.alert("Atenção", "Informe todos as esécies de peixe!", [{ text: "Beleza!" }])
      return;
    }
    defReceita("");
    defLoad(true);
    Keyboard.dismiss();

    const prompt = `Sugira um aquário detalhada em ${ocasiao} usando as seguintes especies de peixes: ${pex1}, ${pex2}, ${pex3} e ${pex4} e pesquise um qauario no YouTube. Caso encontre, informe o link.`;

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
      <Text style={ESTILOS.header}>Aquário rápido</Text>
      <View style={ESTILOS.form}>
        <Text style={ESTILOS.label}>Informe espécies de peixes e tenha um aquário com todos eles:</Text>
        <TextInput
          placeholder="Peixe 1"
          style={ESTILOS.input}
          value={pex1}
          onChangeText={(texto) => defPex1(texto)}
        />
        <TextInput
          placeholder="Peixe 2"
          style={ESTILOS.input}
          value={pex2}
          onChangeText={(texto) => defPex2(texto)}
        />
        <TextInput
          placeholder="Peixe 3"
          style={ESTILOS.input}
          value={pex3}
          onChangeText={(texto) => defPex3(texto)}
        />
        <TextInput
          placeholder="Peixe 4"
          style={ESTILOS.input}
          value={pex4}
          onChangeText={(texto) => defPex4(texto)}
        />
        <TextInput
          placeholder="agua salgada ou doce"
          style={ESTILOS.input}
          value={ocasiao}
          onChangeText={(texto) => defOcasiao(texto)}
        />
      </View>

      <TouchableOpacity style={ESTILOS.button} onPress={gerarReceita}>
        <Text style={ESTILOS.buttonText}>Gerar aquário rápido</Text>
        <MaterialCommunityIcons name="food-variant" size={24} color="#FFF" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4, }} style={ESTILOS.containerScroll} showsVerticalScrollIndicator={false} >
        {load && (
          <View style={ESTILOS.content}>
            <Text style={ESTILOS.title}>Produzindo aquário...</Text>
            <ActivityIndicator color="#000" size="large" />
          </View>
        )}

        {receita && (
          <View style={ESTILOS.content}>
            <Text style={ESTILOS.title}>Seu aquário 👇</Text>
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
    borderColor: '#f8a835',
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#f9d484',
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