<script lang="ts" setup>
import OnyxSkeleton from "../../OnyxSkeleton/OnyxSkeleton.vue";
import OnyxTable from "../OnyxTable.vue";

const skeleton = true; // Skeleton state
</script>

<template>
  <OnyxTable>
    <template #head>
      <tr>
        <th>Fruit</th>
        <th>Price (€/kg)</th>
        <th>Inventory (kg)</th>
        <th>Inventory (pieces)</th>
        <th>Rating</th>
      </tr>
    </template>
    <tr>
      <td><OnyxSkeleton v-if="skeleton" /> <template v-else>Strawbarry</template></td>
      <td><OnyxSkeleton v-if="skeleton" /> <template v-else>4.50</template></td>
      <td><OnyxSkeleton v-if="skeleton" /> <template v-else>200</template></td>
      <td><OnyxSkeleton v-if="skeleton" /> <template v-else>100</template></td>
      <td><OnyxSkeleton v-if="skeleton" /> <template v-else>5</template></td>
    </tr>
    <tr>
      <td><OnyxSkeleton v-if="skeleton" /> <template v-else>Apple</template></td>
      <td><OnyxSkeleton v-if="skeleton" /> <template v-else>1.99</template></td>
      <td><OnyxSkeleton v-if="skeleton" /> <template v-else>3000</template></td>
      <td><OnyxSkeleton v-if="skeleton" /> <template v-else>200</template></td>
      <td><OnyxSkeleton v-if="skeleton" /> <template v-else>3</template></td>
    </tr>
    <tr>
      <td><OnyxSkeleton v-if="skeleton" /> <template v-else>Banana</template></td>
      <td><OnyxSkeleton v-if="skeleton" /> <template v-else>3.75</template></td>
      <td><OnyxSkeleton v-if="skeleton" /> <template v-else>18000</template></td>
      <td><OnyxSkeleton v-if="skeleton" /> <template v-else>300</template></td>
      <td><OnyxSkeleton v-if="skeleton" /> <template v-else>4</template></td>
    </tr>
  </OnyxTable>
</template>
