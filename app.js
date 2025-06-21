// ==================== SERVICE WORKER REGISTRATION ====================
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(() => {
        console.log('Service Worker registered');
    });
}

// ==================== DARK MODE ====================
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ==================== SEARCH FUNCTION ====================
document.getElementById('search').addEventListener('input', function () {
    const value = this.value.toLowerCase();
    document.querySelectorAll('.recipe-box').forEach(box => {
        const text = box.innerText.toLowerCase();
        box.style.display = text.includes(value) ? 'block' : 'none';
    });
});

// ==================== COLLAPSIBLE RECIPES ====================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.recipe-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            content.classList.toggle('open');
            button.classList.toggle('active');
        });
    });
});

// ==================== INSTALL PROMPT ====================
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('install-btn').style.display = 'block';
});

document.getElementById('install-btn').addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choice => {
            if (choice.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
            document.getElementById('install-btn').style.display = 'none';
        });
    }
});

// ==================== INDEXEDDB: OFFLINE RECIPES ====================
const dbName = "QuesadaRecipesDB";
let db;

const openDB = indexedDB.open(dbName, 1);

openDB.onupgradeneeded = function (e) {
    db = e.target.result;
    db.createObjectStore("recipes", { keyPath: "id" });
};

openDB.onsuccess = function (e) {
    db = e.target.result;
    console.log("IndexedDB is ready");
};

function saveRecipe(recipe) {
    const tx = db.transaction("recipes", "readwrite");
    const store = tx.objectStore("recipes");
    store.put(recipe); // Must have an `id` field
    tx.oncomplete = () => console.log("Recipe saved:", recipe);
}

function loadAllRecipes(callback) {
    const tx = db.transaction("recipes", "readonly");
    const store = tx.objectStore("recipes");
    const request = store.getAll();

    request.onsuccess = function () {
        callback(request.result);
    };
}

// Example usage:
// saveRecipe({ id: "1", name: "Barbacoa", ingredients: ["beef", "chipotle"], steps: ["slow cook", "shred"] });
// loadAllRecipes(data => console.log("Recipes from DB:", data));

// ==================== PUSH NOTIFICATIONS (STUB) ====================
if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.ready.then(reg => {
        reg.pushManager.getSubscription().then(subscription => {
            if (!subscription) {
                // Uncomment and provide public VAPID key to enable push
                /*
                reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: 'YOUR_PUBLIC_VAPID_KEY_HERE'
                }).then(sub => {
                    console.log('Push subscription:', sub);
                    // Send sub to your server to store
                });
                */
            }
        });
    });
}
