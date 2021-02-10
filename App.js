import React, {useEffect} from 'react';
import { View, StyleSheet,StatusBar } from 'react-native';
import {LivePlayer} from "react-native-live-stream";
import RNFS from 'react-native-fs';
import {useNetInfo} from '@react-native-community/netinfo'

export default function App () {
  const netInfo = useNetInfo();
  const path = RNFS.ExternalDirectoryPath;
  global.url = ''
  
  useEffect(()=>{
     function downloadVideo(){
       RNFS.readFile(`${path}/url.json`).then(async (contents) => {
        const data = JSON.parse(contents)
        console.log(data.url)
         RNFS.downloadFile({
          fromUrl: `${data.url}`,
          toFile: `${path}/video.mp4`,
        });
      })
    }
    if(netInfo.isConnected){
         downloadVideo();
    }
  }, [netInfo])
  return(
      <View style={styles.backgroud}>
        <StatusBar hidden={true} /> 
        <LivePlayer source={{uri:`${path}/video.mp4`}}
        paused={false}
        muted={false}
        isLooping
        bufferTime={300}
        maxBufferTime={1000}
        resizeMode={"contain"}
        style={styles.backgroundVideo}
        />
      </View>
  );
}
const styles = StyleSheet.create({

  backgroud:{
      width:'100%',
      height:'100%',
  },
  backgroundVideo:{
      height: '100%',
      width: '100%',
      backgroundColor:'#000',
  }
})