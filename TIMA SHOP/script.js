const P = [

    [
        1,
        'Classic Black Set',
        'komplekt',
        389000,
        450000,
        'BESTSELLER',
        'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=900&q=86'
    ],

    [
        2,
        'Premium White Shirt',
        'koylak',
        229000,
        0,
        'NEW',
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=86'
    ],

    [
        3,
        'Urban Black Outfit',
        'komplekt',
        429000,
        0,
        'NEW',
        'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=86'
    ],

    [
        4,
        'Black & White Sport Set',
        'komplekt',
        499000,
        550000,
        'SALE',
        'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=900&q=86'
    ],

    [
        5,
        'Essential Black Jacket',
        'ustki',
        349000,
        0,
        '',
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=86'
    ],

    [
        6,
        'Navy Daily Set',
        'komplekt',
        459000,
        0,
        'NEW',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=86'
    ],

    [
        7,
        'Minimal White Tee',
        'koylak',
        149000,
        179000,
        'SALE',
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=86'
    ],

    [
        8,
        'Burgundy Suit',
        'kostyum',
        579000,
        0,
        '',
        'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=900&q=86'
    ]

];


const money = n =>
    new Intl.NumberFormat('uz-UZ').format(n) + ' so‘m';


let cat = 'all';
let q = '';

let cart =
    JSON.parse(localStorage.timaCart || '[]');

let favs =
    JSON.parse(localStorage.timaFavs || '[]');


const $ = selector =>
    document.querySelector(selector);

const $$ = selector =>
    [...document.querySelectorAll(selector)];


function save() {

    localStorage.timaCart =
        JSON.stringify(cart);

    localStorage.timaFavs =
        JSON.stringify(favs);

    $('#cartCount').textContent =
        cart.reduce((a, x) => a + x.qty, 0);

    $('#favCount').textContent =
        favs.length;
}


function toast(text) {

    $('#toast').textContent = text;

    $('#toast').classList.add('show');

    setTimeout(() => {

        $('#toast').classList.remove('show');

    }, 1800);
}


function render() {

    let products = P.filter(p =>

        (cat === 'all' || p[2] === cat) &&

        p[1]
            .toLowerCase()
            .includes(q.toLowerCase())

    );


    let sort =
        $('#sort').value;


    if (sort === 'low') {

        products.sort(
            (a, b) => a[3] - b[3]
        );

    }


    if (sort === 'high') {

        products.sort(
            (a, b) => b[3] - a[3]
        );

    }


    if (sort === 'new') {

        products.sort(
            (a, b) => b[0] - a[0]
        );

    }


    $('#count').textContent =
        products.length + ' ta mahsulot';


    $('#products').innerHTML =
        products.map(p => `

      <article
        class="card"
        data-id="${p[0]}"
      >

        <div class="pic">

          ${p[5]
                ? `<span class="badge">${p[5]}</span>`
                : ''
            }

          <button
            class="heart ${favs.includes(p[0]) ? 'on' : ''
            }"
            data-f="${p[0]}"
          >
            ${favs.includes(p[0])
                ? '♥'
                : '♡'
            }
          </button>


          <img
            src="${p[6]}"
            alt="${p[1]}"
            loading="lazy"
          >

        </div>


        <div class="info">

          <h3>
            ${p[1]}
          </h3>

          <div>

            <span>

              ${p[4]
                ? `
                    <span class="old">
                      ${money(p[4])}
                    </span>
                  `
                : ''
            }

              <b>
                ${money(p[3])}
              </b>

            </span>

            <span>
              S · M · L · XL
            </span>

          </div>

        </div>

      </article>

    `).join('');


    $$('.card').forEach(card => {

        card.onclick = e => {

            if (
                e.target.closest('[data-f]')
            ) {
                return;
            }

            detail(
                +card.dataset.id
            );

        };

    });


    $$('[data-f]').forEach(button => {

        button.onclick = e => {

            e.stopPropagation();

            const id =
                +button.dataset.f;


            favs = favs.includes(id)

                ? favs.filter(
                    x => x !== id
                )

                : [...favs, id];


            save();

            render();

        };

    });

}


function detail(id) {

    const p =
        P.find(x => x[0] === id);


    $('#productDetail').innerHTML = `

    <div class="detail">

      <img
        src="${p[6]}"
        alt="${p[1]}"
      >


      <div>

        <small class="eyebrow">
          — ${p[5] || 'TIMA SHOP'}
        </small>


        <h2>
          ${p[1]}
        </h2>


        <h3>

          ${p[4]
            ? `
                <span class="old">
                  ${money(p[4])}
                </span>
              `
            : ''
        }

          ${money(p[3])}

        </h3>


        <p>
          Minimalistik, zamonaviy va kundalik
          obraz uchun tanlangan model.
          Sifatli material va qulay bichim.
        </p>


        <div class="opts">

          <small>
            O‘LCHAM
          </small>

          <br>


          ${['S', 'M', 'L', 'XL']
            .map(
                (size, i) => `
                  <button
                    class="${i ? '' : 'active'}"
                    data-size="${size}"
                  >
                    ${size}
                  </button>
                `
            )
            .join('')
        }

        </div>


        <button
          class="btn"
          id="add"
        >
          SAVATGA QO‘SHISH →
        </button>


        <button
          class="btn"
          id="guide"
        >
          O‘lchamlar jadvali
        </button>

      </div>

    </div>

  `;


    $('#productModal')
        .classList.add('show');


    $$('[data-size]').forEach(button => {

        button.onclick = () => {

            $$('[data-size]')
                .forEach(x =>
                    x.classList.remove('active')
                );

            button.classList.add('active');

        };

    });


    $('#add').onclick = () => {

        const size =
            $('[data-size].active').dataset.size;


        const old =
            cart.find(
                x =>
                    x.id === id &&
                    x.size === size
            );


        if (old) {

            old.qty++;

        } else {

            cart.push({
                id,
                size,
                qty: 1
            });

        }


        save();

        closeAll();

        openCart();

        toast('Savatga qo‘shildi');

    };


    $('#guide').onclick = () => {

        $('#productModal')
            .classList.remove('show');

        $('#sizeModal')
            .classList.add('show');

    };

}


function openCart() {

    let html = cart.length

        ? cart.map((item, index) => {

            const p =
                P.find(y => y[0] === item.id);


            return `

          <div class="cartrow">

            <img
              src="${p[6]}"
              alt="${p[1]}"
            >


            <div>

              <h4>
                ${p[1]}
              </h4>

              <p>
                ${item.size} ·
                ${money(p[3])}
              </p>


              <button
                data-minus="${index}"
              >
                −
              </button>

              ${item.qty}

              <button
                data-plus="${index}"
              >
                +
              </button>

            </div>


            <button
              data-del="${index}"
            >
              ×
            </button>

          </div>

        `;

        }).join('')


        : `
      <p
        style="
          color:#888;
          text-align:center;
          margin-top:70px;
        "
      >
        Savat hozircha bo‘sh.
      </p>
    `;


    $('#cartItems').innerHTML =
        html;


    const total =
        cart.reduce(
            (sum, item) => {

                const product =
                    P.find(
                        p => p[0] === item.id
                    );

                return (
                    sum +
                    product[3] * item.qty
                );

            },
            0
        );


    $('#total').textContent =
        money(total);


    $('#cartDrawer')
        .classList.add('show');


    $$('[data-minus]').forEach(button => {

        button.onclick = () =>
            qty(
                +button.dataset.minus,
                -1
            );

    });


    $$('[data-plus]').forEach(button => {

        button.onclick = () =>
            qty(
                +button.dataset.plus,
                1
            );

    });


    $$('[data-del]').forEach(button => {

        button.onclick = () => {

            cart.splice(
                +button.dataset.del,
                1
            );

            save();

            openCart();

        };

    });

}


function qty(index, change) {

    cart[index].qty += change;


    if (cart[index].qty < 1) {

        cart.splice(index, 1);

    }


    save();

    openCart();

}


function closeAll() {

    $$(
        '.modal, .drawer, .searchOverlay'
    ).forEach(element => {

        element.classList.remove('show');

    });

}


$('#cartBtn').onclick =
    openCart;


$('#searchBtn').onclick = () => {

    $('#searchOverlay')
        .classList.add('show');

    $('#globalSearch')
        .focus();

};


$$('.close, .backdrop')
    .forEach(element => {

        element.onclick =
            closeAll;

    });


$('#search').oninput = e => {

    q =
        e.target.value;

    render();

};


$('#sort').onchange =
    render;


$$('[data-cat]').forEach(button => {

    button.onclick = () => {

        cat =
            button.dataset.cat;


        $$('[data-cat]')
            .forEach(x =>
                x.classList.remove('active')
            );


        button.classList.add('active');

        render();

    };

});


$('#checkout').onclick = () => {

    if (!cart.length) {

        return toast(
            'Savat bo‘sh'
        );

    }


    $('#summary').innerHTML =

        cart.map(item => {

            const p =
                P.find(
                    y => y[0] === item.id
                );

            return `
        ${p[1]} × ${item.qty}
        — ${money(p[3] * item.qty)}
      `;

        }).join('<br>');


    closeAll();

    $('#checkoutModal')
        .classList.add('show');

};


$('#orderForm').onsubmit = e => {

    e.preventDefault();


    const form =
        new FormData(e.target);


    const text = `

TIMA SHOP BUYURTMA

${form.get('name')}

${form.get('phone')}

${form.get('city')},
${form.get('address')}


${cart.map(item => {

        const p =
            P.find(
                y => y[0] === item.id
            );

        return (
            p[1] +
            ' / ' +
            item.size +
            ' / ' +
            item.qty
        );

    }).join('\n')}

  `;


    navigator.clipboard?.writeText(text);


    cart = [];

    save();

    e.target.reset();

    closeAll();

    toast(
        'Buyurtma ma’lumotlari nusxalandi. Operator bilan bog‘laning.'
    );

};


$('#sizeGuide').onclick = () => {

    $('#sizeModal')
        .classList.add('show');

};


$$('.faqList button').forEach(button => {

    button.onclick = () =>
        button.classList.toggle('open');

});


$('#globalSearch').oninput = e => {

    const search =
        e.target.value.toLowerCase();


    $('#results').innerHTML =

        P.filter(
            p =>
                p[1]
                    .toLowerCase()
                    .includes(search)
        )

            .map(p => `

      <div
        class="result"
        data-id="${p[0]}"
      >

        <img
          src="${p[6]}"
          alt="${p[1]}"
        >

        <b>
          ${p[1]}
          <br>
          ${money(p[3])}
        </b>

      </div>

    `).join('');


    $$('.result').forEach(result => {

        result.onclick = () => {

            closeAll();

            detail(
                +result.dataset.id
            );

        };

    });

};


$('#favBtn').onclick = () => {

    toast(
        'Sevimlilar: ' +
        favs.length +
        ' ta'
    );

};


save();

render();


// INSTAGRAM IMAGES

const insta = [

    '1516826957135-700dedea698c',
    '1551488831-00ddcb6c6bd3',
    '1593032465175-481ac7f401a0',
    '1490578474895-699cd4e2cf59',
    '1610652492500-ded49ceeb378',
    '1617127365659-c47fa864d8bc'

];


$('.instaGrid').innerHTML =

    insta.map(id => `

    <a
      target="_blank"
      href="https://instagram.com/tima_shop"
    >

      <img
        src="https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&q=82"
        alt="TIMA SHOP"
      >

    </a>

  `).join('');