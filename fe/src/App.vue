<script setup>
import { RouterView } from 'vue-router'
import Container from './views/components/Container.vue'
import { BsCupHotFill } from '@kalimahapps/vue-icons';
</script>

<template>
  <header class="w-11/12 max-w-4xl mx-auto text-center">
    <div class="flex flex-row">
      <div>
        <img height="128" width="128" class="logo" src="/GPU_Driver_icon.png" />
      </div>
      <div class="text-left mt-10 ml-5">
        <strong class="text-xl">
          GPUDriver.com
        </strong>
        <div>
          Get notified for new driver releases
        </div>
      </div>
    </div>
  </header>

  <RouterView />

  <footer>
    <Container class="w-11/12 max-w-4xl mt-7">
      <h2 class="text-xl">What is this?</h2>
      <div class="text-slate-600 dark:text-slate-400">
        <p>
          I'm a big fan of keeping my GPU driver up to date to utilize the latest features and improvements, so I decided
          to create a small tool that tracks GPU drivers releases and notify me
          whenever a new driver is released.
        </p>
        <br />
        <p>
          The tool looks for new releases every ~60 minutes, and if a new release is found, it uses browser notifications
          to notify you (that's why you have to allow notifications permission).
        </p>
      </div>
    </Container>
    <Container class="w-11/12 max-w-4xl mt-7">
      <div class="text-lg">
        <code>
              <div>
                    This service is totally free, please consider donating if you find it useful <BsCupHotFill style="display:inline-block; vertical-align: top;" />
                  </div>
                  </code>

      </div>
      <div class="text-slate-600 dark:text-slate-400">
        <code>
                You know developers are people who convert a lot of <strong>coffee</strong> to some <strong>code</strong>, so a cup of coffee would make my day!
              </code>
      </div>
      <div class="text-center mt-2">
        <form action="https://www.paypal.com/donate" method="post" target="_top">
          <input type="hidden" name="hosted_button_id" value="9TMM7KNGCFTA4" />
          <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit"
            title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
          <img alt="" border="0" src="https://www.paypal.com/en_IL/i/scr/pixel.gif" width="1" height="1" />
        </form>
      </div>
    </Container>

    <div class="text-slate-600 dark:text-slate-400 text-center italic">
      Feel free to contact me at: <a href="mailto:jerry.t@djint.net"><code>jerry.t@djint.net</code></a>
    </div>
  </footer>
</template>


