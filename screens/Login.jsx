import { StyleSheet, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import shareVideo from '../data/share.mp4';
import React, { useState } from 'react'
import { TextInput, Button } from 'react-native-paper';
import { useStateContext } from '../context/ContextProvider'
import Axios from 'axios';

const Login = () => {
    const [name, setName] = useState();
    const [password, setPassword] = useState('');
    const [incorrect, setIncorrent] = useState(false);
    const { setLogin, setprofile } = useStateContext();

    const handleClick = () => {
        Axios.put("http://localhost:3001/uberdata", { name: name, password: password }).then((respose) => {
            if (respose.data != null) {
                setLogin(true)
                setprofile(respose.data);
            }
        })
        setIncorrent(true);
    }
    return (
        <View style={tw`flex justify-start items-center flex-col`}>
            <View style={tw`relative w-full h-full`}>
                <video
                    src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    style={styles.video}
                />
                <View style={tw`absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0`}>
                    <TextInput
                        style={tw`w-64`}
                        theme={{ roundness: 50 }}
                        mode='outlined'
                        label="username"
                        onChangeText={text => setName(text)}
                        left={<TextInput.Icon icon="account" />}
                    />
                    <View style={tw`pt-1`}></View>
                    <TextInput
                        style={tw`w-64`}
                        theme={{ roundness: 50 }}
                        mode='outlined'
                        label="password"
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                        left={<TextInput.Icon icon="lock" />}
                    />
                    <View style={tw`pt-1`}></View>
                    <View style={tw`flex-row`}>
                        <Button
                            style={tw`w-28 p-1`}
                            theme={{ roundness: 50 }}
                            mode="contained"
                            contentStyle={{ flexDirection: 'row-reverse' }}
                            onPress={() => handleClick("schedule")}
                        >
                            Login
                        </Button>
                        <View style={tw`pl-4`}></View>
                        <Button
                            style={tw`w-28 p-1`}
                            theme={{ roundness: 50 }}
                            mode="contained"
                            contentStyle={{ flexDirection: 'row-reverse' }}
                            onPress={() => { }}
                        >
                            Register
                        </Button>
                    </View>
                    {incorrect && <View style={tw`text-red-700`}>Incorrect username or password.</View>}
                </View>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    video:{
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})