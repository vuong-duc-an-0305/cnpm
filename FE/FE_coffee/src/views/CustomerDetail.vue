<template>
  <div class="space-y-6">
    <div class="text-center py-12">
      <Users class="w-16 h-16 text-coffee-300 mx-auto mb-4" />
      <h3 class="text-xl font-bold text-coffee-800 mb-2">Chi tiết khách hàng #{{ $route.params.id }}</h3>
      <p class="text-coffee-600 mb-6">Tính năng xem chi tiết khách hàng đang được phát triển</p>
      <BaseButton @click="$router.push('/customers')" variant="primary">
        <ArrowLeft class="w-4 h-4 mr-2" />
        Quay lại danh sách khách hàng
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Users, ArrowLeft } from 'lucide-vue-next'
import BaseButton from '@/components/common/BaseButton.vue'
</script>
