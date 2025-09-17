<script lang="ts" setup>
import { iconEye, iconTrash } from "@sit-onyx/icons";
import {
  createFeature,
  DataGridFeatures,
  OnyxFileTypeIcon,
  OnyxIconButton,
  useFileSize,
  type ColumnConfig,
  type ColumnGroupConfig,
  type MediaType,
  type TypeRenderMap,
} from "sit-onyx";

type FileEntry = {
  id: string;
  name: string;
  size: number;
  type: MediaType;
  file: File;
};

const props = defineProps<{
  files: File[];
}>();

const emit = defineEmits<{
  /**
   * Emitted when a given file should be removed.
   */
  remove: [file: File];
}>();

const { t } = useI18n();

const data = computed(() =>
  props.files.map<FileEntry>((file) => ({
    id: file.name,
    type: file.type as MediaType,
    name: file.name,
    size: file.size,
    file,
  })),
);

const columns = computed<
  ColumnConfig<
    FileEntry,
    ColumnGroupConfig,
    keyof ReturnType<typeof customColumnTypes>["typeRenderer"]
  >[]
>(() => {
  return [
    { key: "name", label: t("documents.file.filename") },
    { key: "size", label: t("documents.file.size"), type: "fileSize" },
    { key: "type", label: t("documents.file.type"), type: "mediaType" },
    { key: "id", label: t("action", 2), type: "fileActions", width: "max-content" },
  ];
});

const withPagination = DataGridFeatures.usePagination({
  pageSize: 8,
});
const withHideColumns = DataGridFeatures.useHideColumns<FileEntry>({
  columns: { id: { enabled: false } },
});
const withFiltering = DataGridFeatures.useFiltering<FileEntry>({
  columns: { id: { enabled: false } },
});
const withSorting = DataGridFeatures.useSorting<FileEntry>({ columns: { id: { enabled: false } } });
const withStickyColumns = DataGridFeatures.useStickyColumns<FileEntry>({
  columns: ["name"],
  position: "left",
});
const withResizing = DataGridFeatures.useResizing<FileEntry>();
const withSelection = DataGridFeatures.useSelection<FileEntry>();

const { formatFileSize } = useFileSize();

const createFileURL = (file: File) => {
  try {
    return URL.createObjectURL(file);
  } catch {
    return undefined;
  }
};

const customColumnTypes = createFeature(() => ({
  name: Symbol("customTypes"),
  watch: [formatFileSize],
  typeRenderer: {
    fileSize: DataGridFeatures.createTypeRenderer({
      cell: {
        component: ({ modelValue }) => {
          if (typeof modelValue !== "number" || isNaN(modelValue)) return;
          return formatFileSize.value(modelValue);
        },
      },
    }),
    mediaType: DataGridFeatures.createTypeRenderer({
      cell: {
        component: ({ modelValue }) => {
          if (typeof modelValue !== "string") return;

          return h("div", { class: "file-type-cell" }, [
            h(OnyxFileTypeIcon, {
              type: modelValue as MediaType,
            }),
            modelValue,
          ]);
        },
      },
    }),
    fileActions: DataGridFeatures.createTypeRenderer({
      cell: {
        component: ({ modelValue, row }) => {
          if (typeof modelValue !== "string") return;

          const href = createFileURL(row.file);

          return h("div", { class: "actions-cell onyx-density-compact" }, [
            h(OnyxIconButton, {
              label: t("documents.file.actions.show"),
              icon: iconEye,
              link: href ? { href, target: "_blank" } : undefined,
            }),
            h(OnyxIconButton, {
              label: t("documents.file.actions.remove"),
              icon: iconTrash,
              color: "danger",
              onClick: () => emit("remove", row.file),
            }),
          ]);
        },
      },
    }),
  } satisfies TypeRenderMap<FileEntry>,
}));

const features = [
  withFiltering,
  withPagination,
  withHideColumns,
  withSorting,
  withStickyColumns,
  withResizing,
  withSelection,
  customColumnTypes,
];
</script>

<template>
  <OnyxDataGrid
    class="data-grid"
    :headline="{ text: $t('documents.document', 2), rowCount: true }"
    :columns
    :data
    :features
  />
</template>

<style lang="scss" scoped>
.data-grid {
  :deep(.file-type-cell) {
    display: flex;
    align-items: center;
    gap: var(--onyx-density-xs);
  }

  :deep(.actions-cell) {
    display: flex;
    align-items: center;
    gap: var(--onyx-density-xs);
    flex-wrap: wrap;
  }

  :deep(td) {
    align-content: center;
  }
}
</style>
