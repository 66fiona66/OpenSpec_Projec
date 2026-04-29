<template>
  <v-app>
    <!-- Barra superior de l'aplicació -->
    <v-app-bar color="teal-darken-3" elevation="2">
      <v-app-bar-title class="font-weight-bold">Detector d'Aliments IA</v-app-bar-title>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container class="py-10">
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            
            <!-- Targeta principal de càrrega -->
            <v-card class="elevation-4 rounded-xl pa-6">
              <v-card-item>
                <v-card-title class="text-h4 text-center mb-4">
                  És fruita o verdura?
                </v-card-title>
                <v-card-subtitle class="text-center mb-6">
                  Puja una imatge i el nostre model d'IA la classificarà automàticament.
                </v-card-subtitle>
              </v-card-item>

              <v-card-text>
                <!-- Selector de fitxers -->
                <v-file-input
                  v-model="fitxer"
                  label="Selecciona una imatge"
                  accept="image/*"
                  prepend-icon="mdi-camera"
                  variant="outlined"
                  show-size
                  @update:model-value="previsualitzarImatge"
                  color="teal"
                ></v-file-input>

                <!-- Previsualització de la imatge -->
                <v-expand-transition>
                  <div v-if="urlPrevisualitzacio" class="mt-4 text-center">
                    <v-img
                      :src="urlPrevisualitzacio"
                      max-height="300"
                      class="rounded-lg bg-grey-lighten-2 mx-auto"
                      cover
                    ></v-img>
                  </div>
                </v-expand-transition>
              </v-card-text>

              <v-card-actions class="justify-center pt-4">
                <!-- Botó d'anàlisi -->
                <v-btn
                  color="teal-darken-2"
                  size="large"
                  variant="elevated"
                  :loading="carregant"
                  :disabled="!fitxer || carregant"
                  @click="analitzarImatge"
                  class="px-10 rounded-pill"
                >
                  Analitzar aliment
                </v-btn>
              </v-card-actions>
            </v-card>

            <!-- Resultats de l'anàlisi -->
            <v-expand-transition>
              <v-card v-if="resultat" class="mt-8 elevation-3 rounded-xl overflow-hidden">
                <v-alert
                  :color="resultat.categoria === 'fruita' ? 'orange-lighten-4' : (resultat.categoria === 'verdura' ? 'green-lighten-4' : 'grey-lighten-3')"
                  class="pa-6"
                >
                  <template v-slot:prepend>
                    <v-icon
                      size="48"
                      :color="resultat.categoria === 'fruita' ? 'orange-darken-2' : (resultat.categoria === 'verdura' ? 'green-darken-2' : 'grey-darken-1')"
                      :icon="resultat.categoria === 'fruita' ? 'mdi-apple' : (resultat.categoria === 'verdura' ? 'mdi-leaf' : 'mdi-help-circle')"
                    ></v-icon>
                  </template>
                  
                  <div>
                    <div class="text-h5 font-weight-bold mb-1">
                      {{ resultat.categoria.toUpperCase() }} DETECTADA
                    </div>
                    <div class="text-body-1">
                      Hem detectat: <strong>{{ resultat.etiqueta }}</strong>
                    </div>
                    <div class="text-body-2 mt-2">
                      Confiança: {{ resultat.probabilitat }}
                    </div>
                  </div>
                </v-alert>
              </v-card>
            </v-expand-transition>

            <!-- Error -->
            <v-snackbar v-model="mostrarError" color="error" timeout="4000">
              {{ missatgeError }}
            </v-snackbar>

          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Peu de pàgina -->
    <v-footer class="bg-teal-darken-4 text-center d-flex flex-column pa-4">
      <div class="text-body-2">
        Projecte de Detecció d'Aliments amb IA - {{ new Date().getFullYear() }}
      </div>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

// Estats reactius
const fitxer = ref(null);
const urlPrevisualitzacio = ref(null);
const resultat = ref(null);
const carregant = ref(false);
const mostrarError = ref(false);
const missatgeError = ref('');

/**
 * Genera una URL per previsualitzar la imatge seleccionada
 */
const previsualitzarImatge = () => {
  resultat.ref = null;
  if (!fitxer.value || fitxer.value.length === 0) {
    urlPrevisualitzacio.value = null;
    return;
  }
  
  // Create object URL from File
  const file = Array.isArray(fitxer.value) ? fitxer.value[0] : fitxer.value;
  urlPrevisualitzacio.value = URL.createObjectURL(file);
};

/**
 * Envia la imatge al backend per ser analitzada
 */
const analitzarImatge = async () => {
  if (!fitxer.value) return;

  carregant.value = true;
  resultat.value = null;

  const formData = new FormData();
  const file = Array.isArray(fitxer.value) ? fitxer.value[0] : fitxer.value;
  formData.append('imatge', file);

  try {
    const resposta = await fetch('/api/detectar', {
      method: 'POST',
      body: formData,
    });

    if (!resposta.ok) {
      throw new Error('S’ha produït un error en la comunicació amb el servidor.');
    }

    const dades = await resposta.json();
    if (dades.success) {
      resultat.value = dades;
    } else {
      throw new Error(dades.error || 'No s’ha pogut analitzar la imatge.');
    }
  } catch (error) {
    console.error('Error:', error);
    missatgeError.value = error.message;
    mostrarError.value = true;
  } finally {
    carregant.value = false;
  }
};
</script>

<style scoped>
/* Transicions personalitzades si cal */
</style>
