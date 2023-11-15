//! D-Bus interface proxies for: `org.opensuse.Agama.Software1.*`
//!
//! This code was generated by `zbus-xmlgen` `3.1.1` from DBus introspection data.
use zbus::dbus_proxy;

#[dbus_proxy(
    interface = "org.opensuse.Agama.Software1",
    default_service = "org.opensuse.Agama.Software1",
    default_path = "/org/opensuse/Agama/Software1"
)]
trait Software1 {
    /// AddPattern method
    fn add_pattern(&self, id: &str) -> zbus::Result<()>;

    /// Finish method
    fn finish(&self) -> zbus::Result<()>;

    /// Install method
    fn install(&self) -> zbus::Result<()>;

    /// IsPackageInstalled method
    fn is_package_installed(&self, name: &str) -> zbus::Result<bool>;

    /// ListPatterns method
    fn list_patterns(
        &self,
        filtered: bool,
    ) -> zbus::Result<std::collections::HashMap<String, (String, String, String, String, String)>>;

    /// Probe method
    fn probe(&self) -> zbus::Result<()>;

    /// Propose method
    fn propose(&self) -> zbus::Result<()>;

    /// ProvisionsSelected method
    fn provisions_selected(&self, provisions: &[&str]) -> zbus::Result<Vec<bool>>;

    /// RemovePattern method
    fn remove_pattern(&self, id: &str) -> zbus::Result<()>;

    /// SetUserPatterns method
    fn set_user_patterns(&self, ids: &[&str]) -> zbus::Result<()>;

    /// UsedDiskSpace method
    fn used_disk_space(&self) -> zbus::Result<String>;

    /// SelectedPatterns property
    #[dbus_proxy(property)]
    fn selected_patterns(&self) -> zbus::Result<std::collections::HashMap<String, u8>>;
}

#[dbus_proxy(
    interface = "org.opensuse.Agama.Software1.Product",
    default_service = "org.opensuse.Agama.Software1",
    default_path = "/org/opensuse/Agama/Software1/Product"
)]
trait SoftwareProduct {
    /// SelectProduct method
    fn select_product(&self, id: &str) -> zbus::Result<(u32, String)>;

    /// AvailableProducts property
    #[dbus_proxy(property)]
    fn available_products(
        &self,
    ) -> zbus::Result<
        Vec<(
            String,
            String,
            std::collections::HashMap<String, zbus::zvariant::OwnedValue>,
        )>,
    >;

    /// SelectedProduct property
    #[dbus_proxy(property)]
    fn selected_product(&self) -> zbus::Result<String>;
}

#[dbus_proxy(
    interface = "org.opensuse.Agama.Software1.Proposal",
    default_service = "org.opensuse.Agama.Software1",
    default_path = "/org/opensuse/Agama/Software1/Proposal"
)]
trait SoftwareProposal {
    /// AddResolvables method
    fn add_resolvables(
        &self,
        id: &str,
        r#type: u8,
        resolvables: &[&str],
        optional: bool,
    ) -> zbus::Result<()>;

    /// GetResolvables method
    fn get_resolvables(&self, id: &str, r#type: u8, optional: bool) -> zbus::Result<Vec<String>>;

    /// RemoveResolvables method
    fn remove_resolvables(
        &self,
        id: &str,
        r#type: u8,
        resolvables: &[&str],
        optional: bool,
    ) -> zbus::Result<()>;

    /// SetResolvables method
    fn set_resolvables(
        &self,
        id: &str,
        r#type: u8,
        resolvables: &[&str],
        optional: bool,
    ) -> zbus::Result<()>;
}
