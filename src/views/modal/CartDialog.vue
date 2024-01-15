<template>
    <ion-modal ref="modal" trigger="CartButton" @willPresent="onPresent">
        <ion-header>
            <ion-toolbar  color="primary">
                <ion-button @click="cancel()" fill="clear" slot="start">
                    <ion-icon :icon="arrowBack" color="dark"></ion-icon>
                </ion-button>
                <ion-title style="text-align: center; margin-right: 2rem;">CART</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-list>
                <ion-grid v-for="item in CART">
                    <ion-card style="margin: 0%;">
                        <ion-card-content>
                            <ion-row>
                                <ion-col size="2">
                                    <ion-checkbox style="margin-top: 100%;" v-model="item.isCheck"
                                        @ionChange="itemIsCheck"></ion-checkbox>
                                </ion-col>
                                <ion-col size="4"> <img :src="item.base64img" alt=""
                                        style="height: 100px; width: 100px; object-fit: cover;" /></ion-col>
                                <ion-col size="6">
                                    <ion-row>
                                        <ion-col size="1"></ion-col>
                                        <ion-col><strong>{{ item.name }}</strong></ion-col>
                                    </ion-row>
                                    <ion-row>
                                        <ion-col size="1"></ion-col>
                                        <ion-col>{{ item.store_name }}</ion-col>
                                    </ion-row>
                                    <ion-row>
                                        <ion-col size="1"></ion-col>
                                        <ion-col>₱{{ item.price }}</ion-col>
                                    </ion-row>
                                    <ion-row>
                                        <ion-col size="1"></ion-col>
                                        <ion-col size="11">
                                            <ion-tab-bar>
                                                <ion-button size="small" fill="outline" color="dark"
                                                    @click="deacreaseQuantity(item)"><strong>-</strong></ion-button>
                                                <ion-button size="small" fill="outline" color="dark"><strong>{{
                                                    item.quantity }}</strong></ion-button>
                                                <ion-button size="small" fill="outline" color="dark"
                                                    @click="increaseQuantity(item)"><strong>+</strong></ion-button>
                                            </ion-tab-bar>
                                        </ion-col>
                                    </ion-row>
                                </ion-col>
                            </ion-row>
                            <!-- <ion-item-divider></ion-item-divider> -->
                        </ion-card-content>
                    </ion-card>
                </ion-grid>
            </ion-list>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-grid>
                    <ion-row class="ion-align-items-center ">
                        <ion-col size="1"><ion-checkbox v-model="all" label-placement="end"
                                @ionChange="selectAll">ALL</ion-checkbox></ion-col>
                        <ion-col size="2"></ion-col>
                        <ion-col size="4"> Total: <span style="color: red;">₱{{ total }}</span></ion-col>
                        <ion-col size="5">
                            <ion-button :strong="true" fill="solid" color="danger" @click="checkout"
                                style="margin-left: 1rem;">Check out</ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-toolbar>
        </ion-footer>
    </ion-modal>
</template>

<script  >
import { IonTabs, IonTabBar, IonTabButton, IonCheckbox, IonItemDivider, IonFooter, IonCol, IonGrid, IonRow, IonHeader, IonToolbar, IonButtons, IonTitle, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonModal, IonContent, IonIcon, IonItem, IonList, IonImg, IonLabel, IonSearchbar, IonChip, IonAccordion, IonAccordionGroup } from '@ionic/vue';
import { ref, onMounted, defineComponent } from 'vue';
import { mapGetters } from "vuex";
import { arrowBack, cart, time, alert } from 'ionicons/icons';
import { alertController } from '@ionic/vue';

export default defineComponent({
    components: {
        IonTabs, IonTabBar, IonTabButton, IonCheckbox, IonItemDivider, IonIcon, IonFooter, IonCol, IonGrid, IonRow, IonHeader, IonToolbar, IonButtons, IonTitle, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonModal, IonContent, IonIcon, IonItem, IonList, IonImg, IonLabel, IonSearchbar, IonChip, IonAccordion, IonAccordionGroup
    },
    methods: {
        itemIsCheck() {
            // console.log(this.CART)
        },
        selectAll() {
            let checkAllCart = this.CART
            if(this.all){
                checkAllCart.forEach(item=>{
                    item.isCheck = true
                })
            }
            else{
                checkAllCart.forEach(item=>{
                    item.isCheck = false
                })
            }
            this.$store.commit('CART', checkAllCart);
        },
        async increaseQuantity(item) {
            if (item.stock > 0) {
                item.stock -= 1;
                item.quantity += 1;
                const payload = {
                    product_id: item.id,
                };
                await this.$store.dispatch("INCREASE_CART_PRODUCT", payload);
            }
            else {
                const alert = await alertController.create({
                    header: 'Warning',
                    message: 'Out Of Stock!',
                    buttons: ['OK'],
                });
                await alert.present();
            }
        },
        async deacreaseQuantity(item) {
            item.stock += 1;
            item.quantity -= 1;
            if (item.quantity <= 0) {
                const newCart = this.CART.filter((item2) => item2 !== item);
                this.$store.commit("CART", newCart);
            }
            const payload = {
                product_id: item.id,
            };
            await this.$store.dispatch("DECREASE_CART_PRODUCT", payload);
        },
        cancel() {
            this.$refs.modal.$el.dismiss(null, 'cancel');
        },
        async fetchItems() {
            await this.$store.dispatch("GET_CART").then((response) => {
                const cartWithIsCheck = response.map((item) => {
                    return {
                        ...item,
                        isCheck: false,
                    };
                });
                this.$store.commit('CART', cartWithIsCheck)
            })
        },
        onPresent() {
            this.fetchItems()
        },
        async checkout() {
            const cartLocal = this.CART.filter((item) => { return item.isCheck === true });
            console.log(cartLocal)
            if (cartLocal.length <= 0) {
                return
            }
            if (this.USER_DETAILS.balance < this.total) {
                const alert = await alertController.create({
                    header: 'Warning',
                    message: 'Insufficient Balance!',
                    buttons: ['OK'],
                });
                await alert.present();
                return;
            }
            cartLocal.forEach(async (item) => {
                if (item.stock < 0) {
                    const alert = await alertController.create({
                        header: 'Warning',
                        message: 'Stock is Less than Quantity!',
                        buttons: ['OK'],
                    });
                    await alert.present();
                    return;
                }
            });
            const payload = {
                cart: cartLocal,
                status: "pending",
                total: this.total,
            };
            this.$store.dispatch("ORDER", payload).then(async (response) => {
                if (response == "invalid") {
                    const alert = await alertController.create({
                        header: 'Warning',
                        message: 'Stock is Less than Quantity!',
                        buttons: ['OK'],
                    });
                    await alert.present();
                }
                //server side validation of balance and total amount of order
                else if (response == "insufficient balance") {
                    const alert = await alertController.create({
                        header: 'Warning',
                        message: 'insufficient balance!',
                        buttons: ['OK'],
                    });
                    await alert.present();
                } else if (response == "success") {
                    const alert = await alertController.create({
                        header: 'Success',
                        message: 'Order Success!',
                        buttons: ['OK'],
                    });
                    await alert.present();
                }
                this.fetchItems()
                this.$store.dispatch("GetUserDetails");
            });
        }
    },
    computed: {
        ...mapGetters(["CART", "SELECTED_STORE", "USER_DETAILS"]),
        total() {
            // Filter the items where itemIsCheck is true
            const checkedItems = this.CART.filter(item => item.isCheck);

            // Calculate the total for the filtered items
            return checkedItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );
        },

    },
    data() {
        return {
            arrowBack,
            all: false
        }
    },
    mounted() {

    },
    watch: {
        CART: {
            handler(val) {
                // console.log(val)
            },
        },
    },
});
</script>