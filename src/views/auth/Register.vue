<template>
  <div class="register-page">
    <el-row :gutter="20">
      <el-col :span="8" :offset="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3 class="my-0"><i class="el-icon-edit-outline"></i> {{ $t('auth.register') }}</h3>
          </div>
          <div class="text">
            <el-alert
              v-if="message"
              :title="message"
              :type="!error ? 'success' : 'error'"
              :description="(error && 'message' in error) ? error.message : ''"
              show-icon
            />
            <el-form
              ref="registForm"
              :model="registForm"
              status-icon
              :rules="moreRules"
              label-position="top"
              label-width="120px"
              class="login-form"
              v-loading="loading"
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
                  type="email"
                  v-model="registForm.email"
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
                  v-model="registForm.password"
                  autocomplete="off"
                  :placeholder="$t('auth.password_placeholder')">
                  <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
              </el-form-item>

              <el-form-item
                :label="$t('auth.confirm_password')"
                prop="confirmPassword"
                required
              >
                <el-input
                  type="password"
                  v-model="registForm.confirmPassword"
                  autocomplete="off"
                  :placeholder="$t('auth.password_placeholder')">
                  <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
              </el-form-item>

              <el-form-item class="mt-40">
                <el-button
                  type="primary"
                  icon="el-icon-check"
                  @click="submitForm('registForm')"
                >{{ $t('auth.register') }}</el-button>
                <el-button
                  icon="el-icon-refresh"
                  @click="resetForm('registForm')"
                >{{ $t('common.reset') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
  .register-page {
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
import { register } from '@/services/auth.service';

export default {
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('error.AUTHVALID004')));
      } else if (value.length < 6) {
        callback(new Error(this.$t('error.AUTHVALID006')));
      } else {
        if (this.registForm.confirmPassword !== '') {
          this.$refs.registForm.validateField('confirmPassword');
        }
        callback();
      }
    };

    const validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('error.AUTHVALID005')));
      } else if (value.length < 6) {
        callback(new Error(this.$t('error.AUTHVALID006')));
      } else if (value !== this.registForm.password) {
        callback(new Error(this.$t('error.AUTHVALID007')));
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
      registForm: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      moreRules: {
        password: [
          { validator: validatePassword, trigger: 'blur' },
        ],
        confirmPassword: [
          { validator: validateConfirmPassword, trigger: 'blur' }
        ],
      },
    };
  },
  methods: {
    async submitForm (formName) {
      this.validate(formName);

      if (!this.valid) return;

      this.loading = true;

      const { email, password } = this.registForm;
      const result = await register(email, password);

      const { status, code, description } = result;

      this.loading = false;
      this.error = status ? null : {
        description
      };
      this.message = this.$t(code);

      if (status) {
        this.resetForm(formName);
        this.$router.go(1);
      };
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    validate (ref) {
      this.$refs[ref].validate(valid => {
        this.valid = valid ? true : false;
      });
    },
  },
};
</script>
