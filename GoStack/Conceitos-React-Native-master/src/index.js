import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'

import api from './services/api'

export default function App(){
    
    const [ repositories, setRepositories ] = useState([])

    useEffect(() => {
        api.get('repositories').then(response => {
            
            setRepositories(response.data)
        })
    }, [])

    async function handleAddRepo(){
        const response = await api.post('repositories', {
            title : `Repository ${Date.now()}`, 
            url : 'https://github.com/LeozinH1/repository-name', 
            techs : [
                        'Node', 
                        'React'
                    ] 
        })

        setRepositories([ ... repositories, response.data ])
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

                <FlatList 
                    data={repositories} 
                    keyExtractor={repository => repository.id} 
                    renderItem={
                        ({ item }) => (
                            <Text style={styles.text}>{item.title}</Text>
                        )
                    }>
                </FlatList>

                <TouchableOpacity style={styles.button} onPress={handleAddRepo}>
                    <Text style={styles.textButton}>Add Repository</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </>
    )
}

const styles = new StyleSheet.create({
    container : {
        backgroundColor: "#7159c1",
        flex: 1,
    },

    text : {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700'
    },

    button : {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        margin: 10
    },

    textButton : {
        fontWeight: '700'
    }
})