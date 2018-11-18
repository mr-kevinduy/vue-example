<template>
  <div class="login-page">
    <el-row :gutter="20">
      <el-col :span="8" :offset="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3 class="my-0">{{ $t('auth.login') }} <i class="el-icon-arrow-right"></i></h3>
          </div>
          <div class="text">
            <el-alert
              v-if="message"
              :title="message"
              :type="!error ? 'success' : 'error'"
              :description="(error && 'description' in error && error.description) ? error.description : ''"
              show-icon
            />
            <el-form
              ref="loginForm"
              :model="loginForm"
              status-icon
              :rules="moreRules"
              label-position="top"
              label-width="120px"
              class="login-form"
              @submit.native.prevent="submitForm"
            >
              <el-form-item
                prop="email"
                :label="$t('auth.email')"
                :rules="[
                  { required: true, message: $t('error.AUTHVALID001'), trigger: 'blur' },
                  { type: 'email', message: $t('error.AUTHVALID002'), trigger: ['blur', 'change'] }
                ]"
              >
                <el-input
                  v-model="loginForm.email"
                  :placeholder="$t('auth.email_placeholder')">
                  <template slot="prepend"><i class="el-icon-message"></i></template>
                </el-input>
              </el-form-item>

              <el-form-item
                :label="$t('auth.password')"
                prop="password"
                required
              >
                <el-input
                  type="password"
                  v-model="loginForm.password"
                  autocomplete="off"
                  :placeholder="$t('auth.password_placeholder')">
                  <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
              </el-form-item>

              <el-form-item class="mt-40">
                <el-button
                  type="primary"
                  icon="el-icon-check"
                  @click="submitForm('loginForm')"
                >{{ $t('auth.login') }}</el-button>
                <span> -OR- </span>
                <el-button
                  icon="el-icon-edit-outline"
                  @click="registForm()"
                >{{ $t('auth.register') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
  .login-page {
    .el-card__header {
      color: #fff;
      background-color: #409eff;
      text-align: center;
    }

    .el-card__body {
      padding: 20px 50px;
    }
  }
</style>

<script>
import { login } from '@/services/auth.service';

export default {
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('error.AUTHVALID004')));
      } else if (value.length < 6) {
        callback(new Error(this.$t('error.AUTHVALID006')));
      } else {
        callback();
      }
    };

    return {
      disable: false,
      error: null,
      message: null,
      loading: false,
      valid: false,
      loginForm: {
        email: '',
        password: '',
      },
      moreRules: {
        password: [
          { validator: validatePassword, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    async submitForm (formName) {
      this.validate(formName);

      if (!this.valid) return;

      this.loading = true;

      const { email, password } = this.loginForm;
      const result = await login(email, password);
      const { status, code, description } = result;

      this.loading = false;
      this.error = status ? null : {
        description
      };
      this.message = this.$t(code);

      if (status) this.$router.push('/');
    },
    registForm () {
      this.$router.push({ name: 'register'});
    },
    validate (ref) {
      this.$refs[ref].validate(valid => {
        this.valid = valid ? true : false;
      });
    },
  },
};
</script>
