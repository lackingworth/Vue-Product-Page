app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `
    <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img 
                :src="image" 
                :alt="description"
                :class="{ 'out-of-stock-img': !inStock  }">
            </div>
            <div class="product-info">
                <h1>{{ title }} </h1>
                <p v-if="inStock && this.variants[this.selectedVariant].quantity <= 10">Almost sold out!</p>
                <p v-else-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{ shipping }}</p>
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>
                <div 
                    class="color-circle" 
                    v-for="(variant, index) in variants" 
                    :key="variant.id" 
                    @mouseover="updateVariant(index)"
                    :style="{ backgroundColor: variant.color }">
                </div>
                <button 
                    class="button"
                    :class="{ disabledButton: !inStock }"
                    :disabled="!inStock" 
                    @click="addToCart">
                    Add to Cart
                </button>
            </div>
        </div>
        <review-list v-show="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
    </div>`,
    data() {
        return {
            product: 'Hoodie',
            brand: 'Brand',
            description: 'Hoodie description',
            selectedVariant: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, colorText: 'Green', color: 'green', image: './assets/images/green_hoodie.webp', quantity: 11, sale: true },
                { id: 2235, colorText: 'Blue', color: 'blue', image: './assets/images/blue_hoodie.webp', quantity: 0 },
            ],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
            this.variants[this.selectedVariant].quantity -= 1;
        },
        updateVariant(index) {
            this.selectedVariant = index;
        },
        addReview(review) {
            this.reviews.push(review);
        }
    },
    computed: {
        title() {
            if (this.variants[this.selectedVariant].sale) {
                return `${this.brand} ${this.variants[this.selectedVariant].colorText} ${this.product} is on Sale!`
            };
            return `${this.brand} ${this.variants[this.selectedVariant].colorText} ${this.product}`;
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity;
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            };
            return '$2.99';
        }
    }
})