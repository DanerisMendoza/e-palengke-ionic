<template>
    <ion-page>
        <Toolbar />
        <ion-content class="ion-padding">
            <ion-button @click="takePicture">Take Picture</ion-button>
            <ion-img :src="imageUrl" v-if="imageUrl"></ion-img>
        </ion-content>
    </ion-page>
</template>
  
<script>
import { IonButtons, IonMenuToggle, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter,IonImg } from '@ionic/vue';
import { menu } from 'ionicons/icons';
import Toolbar from "@/views/components/toolbar.vue";
import { Camera, CameraResultType } from '@capacitor/camera';

export default {
    components:{
        IonPage,IonContent,Toolbar,IonButton,IonImg
    },
    data() {
        return {
            imageUrl: null,
        };
    },
    methods: {
        async takePicture() {
            try {
                const image = await Camera.getPhoto({
                    quality: 90,
                    allowEditing: true,
                    resultType: CameraResultType.Uri,
                });

                // image.webPath will contain a path that can be set as an image src.
                // You can access the original file using image.path,
                // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
                this.imageUrl = image.webPath;
            } catch (error) {
                console.error('Error taking picture:', error);
            }
        },
    },
};
</script>