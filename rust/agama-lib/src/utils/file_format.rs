// Copyright (c) [2024] SUSE LLC
//
// All Rights Reserved.
//
// This program is free software; you can redistribute it and/or modify it
// under the terms of the GNU General Public License as published by the Free
// Software Foundation; either version 2 of the License, or (at your option)
// any later version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
// more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, contact SUSE LLC.
//
// To contact SUSE LLC about this file by physical or electronic mail, you may
// find current contact information at www.suse.com.

//! File format detection for Agama.
//!
//! It implements a simple API to detect the file formats that are relevent for Agama.

use std::{
    io::Write,
    process::{Command, Stdio},
};

/// File formats
#[derive(Debug, PartialEq, Copy, Clone)]
pub enum FileFormat {
    Json,
    Jsonnet,
    Script,
    Unknown,
}

const JSONNETFMT_PATH: &str = "/usr/bin/jsonnetfmt";

impl FileFormat {
    pub fn from_file(file_path: &str) -> Self {
        let Ok(content) = std::fs::read_to_string(file_path) else {
            return Self::Unknown;
        };
        Self::from_string(&content)
    }

    pub fn from_string(content: &str) -> Self {
        if Self::is_json(content) {
            return Self::Json;
        } else if Self::is_jsonnet(content) {
            return Self::Jsonnet;
        } else if Self::is_script(content) {
            return Self::Script;
        }

        Self::Unknown
    }

    fn is_json(content: &str) -> bool {
        let json = serde_json::from_str::<serde_json::Value>(content);
        json.is_ok()
    }

    fn is_jsonnet(content: &str) -> bool {
        let child = Command::new(JSONNETFMT_PATH)
            .args(["-"])
            .stdin(Stdio::piped())
            .spawn();

        let Ok(mut child) = child else {
            return false;
        };

        let Some(mut stdin) = child.stdin.take() else {
            return false;
        };

        stdin
            .write_all(content.as_bytes())
            .expect("Failed to write to stdin");
        drop(stdin);

        child.wait().is_ok_and(|s| s.success())
    }

    fn is_script(content: &str) -> bool {
        content.starts_with("#!")
    }
}

#[cfg(test)]
mod tests {
    use super::FileFormat;

    #[test]
    fn test_json() {
        let content = r#"
            { "name:": "value"}
            "#;

        assert_eq!(FileFormat::from_string(content), FileFormat::Json);
    }

    #[test]
    fn test_jsonnet() {
        let content = r#"
            { name: "value" }
            "#;

        assert_eq!(FileFormat::from_string(content), FileFormat::Jsonnet);
    }

    #[test]
    fn test_script() {
        let content = r#"#!/bin/bash
            echo "Hello World"
            "#;

        assert_eq!(FileFormat::from_string(content), FileFormat::Script);
    }
}